$containerLocation = "$($env:containerId):c:/app/build/packageVersions.json"
write-host $containerLocation
docker cp $containerLocation deploy/PackageVersions.json