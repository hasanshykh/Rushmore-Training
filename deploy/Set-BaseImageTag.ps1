$apiCall = "https://microsoft.visualstudio.com/DefaultCollection/Universal Store/_apis/build/builds?definitions=32672&maxbuildsperdefinition=1&resultFilter=succeeded"
$basicauth = ":$($env:System_ACCESSTOKEN)"
$basicauth = [System.Text.Encoding]::UTF8.GetBytes($basicauth)
$basicauth = [System.Convert]::ToBase64String($basicauth)
$authheader = @{Authorization="Basic $basicauth"}


$responseContentType = "application/json"
$response = Invoke-RestMethod -Uri $apiCall -Headers $authheader -Method GET -ContentType $responseContentType
$lastbuild = $response.value.id
if($lastbuild -eq $null){
    write-host $lastbuild
    write-host $response
    throw "didn't get response"
}

$basetag = "onerf.azurecr.io/$($env:Build_Repository_Name)-base:$lastbuild".ToLower()
$tag = "onerf.azurecr.io/$($env:Build_Repository_Name):$($env:Build_BuildId)".ToLower()
$cb = (get-date -format g).replace(':',"-")
Write-Host "##vso[task.setvariable variable=BaseImageTag]$basetag"
Write-Host "##vso[task.setvariable variable=ImageTag]$tag"
Write-Host "##vso[task.setvariable variable=CacheBust]$cb"