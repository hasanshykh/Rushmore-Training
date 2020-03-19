$containerId = docker run -dP --rm "$($env:imagetag)"
if ($containerId -eq $null) {
    Write-Host "Failed to start container $containerName"
    exit -1
}
$containerIp = docker inspect $containerId --format='{{.NetworkSettings.Networks.nat.IPAddress}}'
Write-Host "##vso[task.setvariable variable=containerId]$containerId"
Write-Host "##vso[task.setvariable variable=containerIp]$containerIp"