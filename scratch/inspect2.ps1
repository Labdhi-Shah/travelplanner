Add-Type -AssemblyName System.Drawing
$bmp = New-Object System.Drawing.Bitmap('C:\Users\Labdhi\.gemini\antigravity-ide\brain\0ee97829-bae1-425b-b07d-43fcd9a10e9a\.user_uploaded\media_1788371026081.png')

for ($y = 30; $y -le 85; $y++) {
    $line = ""
    for ($x = 35; $x -le 90; $x++) {
        $p = $bmp.GetPixel($x, $y)
        # Gold is around R:200, G:160, B:90
        # Dark T is R:10, G:40, B:40
        # BG is dark blue/teal R:10, G:50, B:60
        $isGold = ($p.R -gt 150 -and $p.G -gt 120 -and $p.B -lt 120)
        $isDarkT = ($p.R -lt 40 -and $p.G -lt 60 -and $p.B -lt 60)
        
        if ($isDarkT) {
            $line += "T"
        } elseif ($isGold) {
            $line += "#"
        } else {
            $line += " "
        }
    }
    Write-Host $line
}
$bmp.Dispose()
