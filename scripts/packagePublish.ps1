# Script which finds package versions which have changed
# and publishes them if they haven't been published before

# Helper Function for writing clear logs in VSTS
function Write-Clear{
    param($message)
    write-host "`n`n`n$message`n`n`n"
}

# Function to detect if an incoming changed file is a
# packages/{packagename}/package.json
# file with it's version changed
function Validate-Changed{
    $pathValue = "src/themes/fabrikam/package.json"

    if(!(test-path $pathValue)){
        Write-Clear "Path is incorrect $pathValue"
        return $false
    }

    # Get our package.json information
    $content = get-content $pathValue
    $contentJson = $content | ConvertFrom-Json
    $name = $contentJson.name
    $version = $contentJson.version

    # Verify that we had a change to the "version" part of the package.json
    $v = git diff $lastPublishedCommit..$currentCommit --unified=0 -- $pathValue
    $versionChanged = $false
    for($i=0; $i -lt $v.count; $i++){
        if($v[$i].contains("`"version`"")){
            $versionChanged = $true
            break
        }
    }
    if(!$versionChanged){
         Write-Clear "Version did not change"
        return $false
    }

    # Verify that either we don't have a git tag for the version, or that it hasn't been published already
    $versionTag = "$name@$version"
    $tagValue = git ls-remote --tags origin $versionTag
    if($tagValue -ne $null){
        Write-Clear "Tag for $versionTag already exists, skipping publish!"
        return $false
    }
    $yarnInfo = yarn info $name versions --json
    if($yarnInfo -ne $null){
        $yarnInfo = $yarnInfo | ConvertFrom-Json
        if($yarnInfo.data.contains($version)){
            Write-Clear "Version already published for $versionTag, skipping publish!"
            return $false
        }
    }

    # All verification met, return data on package to publish
    return [PSCustomObject]@{
        Name = $name
        Version = $version
        Path = $pathValue.Substring(0,$pathValue.LastIndexOf("/"))
    }

}

# Function to update the lastpublish tag
function Update-LastPublishTag{
    param($hash)
    git push origin :refs/tags/lastpublish
    git tag -f lastpublish $hash
    git push origin lastpublish --force
    Write-Clear "Updated lastpublish tag"
}


# Function to publish a given package
function Publish-Package{
    param($packageObject, $currentCommit)

    Write-Clear "Publishing Package: $packageObject"
    cp .npmrc "$($packageObject.path)/.npmrc" -force
    cd $($packageObject.path)
    npm publish | write-host
    if($lastexitcode -ne 0){
        Write-Clear "Publish Failed for $($packageObject.name)"
        rm -force .npmrc
        cd ../..
        return $false
    }
    $versionTag = "$($packageObject.name)@$($packageObject.version)"
    git tag -f $versionTag $currentCommit | write-host
    git push origin $versionTag --force | write-host
    rm -force .npmrc
    cd ../..
    return $true
}


# Start Script

# Make sure our tags are up to date
git fetch --tags
$currentCommit = git rev-list -n 1 HEAD
$lastPublishedCommit = git rev-list -n 1 lastpublish
if ($currentCommit -eq $lastPublishedCommit){
    Write-Clear "HEAD is on same commit as last release tag"
    return
}

# Diff our lastpublish tag with the last commit, and get a list of changed package.json versions
$diff = git diff --name-status $currentCommit..$lastPublishedCommit
npm install yarn --global
$packageInfo = Validate-Changed($pathValue)

if($packageInfo -eq $false){
    Write-Clear "No Package Versions changed, skipping publish"
    Update-LastPublishTag $currentCommit
    return
}

Write-Clear "Changes found!"
Write-Host $packageInfo

# Install, build, and publish any changes, doing starter-pack last
$flawless = $true
if($packageInfo -ne $false){
    write-host $packageInfo
    $publishResult = $(Publish-Package $packageInfo $currentCommit)
    write-host "Publish gave back: $publishResult"
    if($publishResult -ne $true){
        $publishResult = $false
    }
    $flawless = $publishResult
}


 # If our publish was 100% successful, we'll update our lastpublish tag
 write-host "Errors Seen? $flawless"
 if($flawless){
    Update-LastPublishTag $currentCommit
 }
 else{
    throw "Error in package publish, skipping tag update"
 }