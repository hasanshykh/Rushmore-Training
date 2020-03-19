#Reads the top 10 sites from Healthcheck and fails if any one of them fails

$hostname = "$($env:containerIp):4000"
$items = Get-Content "deploy\HealthCheckList.txt" -Head 10 
foreach($item in $items){
    $response = Invoke-WebRequest http://$hostname$item -usebasicparsing
    if (($response.StatusCode -ne 200) -or ($response.RawContentLength -lt 5)){ 
        exit 1 
    } 
}
    
exit 0

