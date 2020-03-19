if($env:build_reason -ne "Schedule"){
    "Not a scheduled build, skipping version check"
    exit 0
}
write-host "Scheduled build, starting version check"
$oldpath = "$($env:System_ArtifactsDirectory)/version/packageVersions.json"
$oldVersionInfo = get-content $oldpath | ConvertFrom-Json
write-host "old info"
write-host $oldVersionInfo
write-host $oldVersionInfo.microsoft
write-host $oldVersionInfo.microsoftModules
write-host $oldVersionInfo.razzle

$newpath = "deploy/packageVersions.json"
$newVersionInfo = get-content $newpath | ConvertFrom-Json
write-host "new info"
write-host $newVersionInfo
write-host $newVersionInfo.microsoft
write-host $newVersionInfo.microsoftModules
write-host $newVersionInfo.razzle

#check counts
if($oldVersionInfo.microsoft.count -ne $newVersionInfo.microsoft.count){
    write-host "Found Difference in Microsoft count"
    exit 0
}
if($oldVersionInfo.razzle.count -ne $newVersionInfo.razzle.count){
    write-host "Found Difference in razzle count"
    exit 0
}
if($oldVersionInfo.microsoftModules.count -ne $newVersionInfo.microsoftModules.count){
    write-host "Found Difference in Microsoft Moudle count"
    exit 0
}

#now loop through and confirm version
foreach($mod in $oldVersionInfo.microsoft){
    $index = $newVersionInfo.microsoft.moduleName.indexOf($mod.moduleName)
    if($index -eq -1){
        write-host "couldn't find module: "
        write-host $mod
        exit 0
    }
    if($mod.version -ne $newVersionInfo.microsoft.version[$index]){
        write-host "versions don't match"
        write-host $mod
        exit 0
    }
}
foreach($mod in $oldVersionInfo.razzle){
    $index = $newVersionInfo.razzle.moduleName.indexOf($mod.moduleName)
    if($index -eq -1){
        write-host "couldn't find module: "
        write-host $mod
        exit 0
    }
    if($mod.version -ne $newVersionInfo.razzle.version[$index]){
        write-host "versions don't match"
        write-host $mod
        exit 0
    }
}
foreach($mod in $oldVersionInfo.microsoftModules){
    $index = $newVersionInfo.microsoftModules.moduleName.indexOf($mod.moduleName)
    if($index -eq -1){
        write-host "couldn't find module: "
        write-host $mod
        exit 0
    }
    if($mod.version -ne $newVersionInfo.microsoftModules.version[$index]){
        write-host "versions don't match"
        write-host $mod
        exit 0
    }
}

write-host "no differences found, failing"
exit 1