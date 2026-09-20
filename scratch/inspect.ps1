Add-Type -AssemblyName System.Drawing
$bmp = New-Object System.Drawing.Bitmap('C:\Users\Labdhi\.gemini\antigravity-ide\brain\0ee97829-bae1-425b-b07d-43fcd9a10e9a\.user_uploaded\media_1788371026081.png')
Write-Host "Width: $($bmp.Width), Height: $($bmp.Height)"

# Find bounding box of golden circle
$minX = 9999; $maxX = 0; $minY = 9999; $maxY = 0
for ($y = 0; $y -lt $bmp.Height; $y++) {
    for ($x = 0; $x -lt $bmp.Width; $x++) {
        $p = $bmp.GetPixel($x, $y)
        # Gold accent color is ~ R: 200, G: 160, B: 90
        if ($p.R -gt 160 -and $p.G -gt 130 -and $p.B -lt 120) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}
Write-Host "Circle bounds: X=$minX..$maxX, Y=$minY..$maxY"

for ($y = $minY; $y -le $maxY; $y += 2) {
    $line = ""
    for ($x = $minX; $x -le $maxX; $x += 1) {
        $p = $bmp.GetPixel($x, $y)
        if ($p.R -gt 160 -and $p.G -gt 130 -and $p.B -lt 120) {
            $line += "#"
        } elseif ($p.R -lt 50 -and $p.G -lt 60 -and $p.B -lt 60) {
            $line += "T"
        } else {
            $line += "."
        }
    }
    Write-Host $line
}
$bmp.Dispose()
