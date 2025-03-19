# PowerShell script to download placeholder images for Fun Destino Mall website

# Create images directory if it doesn't exist
if (-not (Test-Path -Path "images")) {
    New-Item -ItemType Directory -Path "images"
}

# Define image URLs and filenames
$imageList = @(
    @{
        URL = "https://picsum.photos/1600/900"
        Filename = "mall-hero.jpg"
    },
    @{
        URL = "https://picsum.photos/800/600"
        Filename = "developer.jpg"
    },
    @{
        URL = "https://picsum.photos/600/400"
        Filename = "subway.png"
    },
    @{
        URL = "https://picsum.photos/600/400"
        Filename = "kfc.png"
    },
    @{
        URL = "https://picsum.photos/600/400"
        Filename = "dominos.png"
    },
    @{
        URL = "https://picsum.photos/600/400"
        Filename = "retail.png"
    },
    @{
        URL = "https://picsum.photos/600/400"
        Filename = "shops.png"
    },
    @{
        URL = "https://picsum.photos/800/600"
        Filename = "food-court.jpg"
    },
    @{
        URL = "https://picsum.photos/800/600"
        Filename = "bar.jpg"
    },
    @{
        URL = "https://picsum.photos/800/600"
        Filename = "cinema.jpg"
    },
    @{
        URL = "https://picsum.photos/400/400"
        Filename = "testimonial1.jpg"
    },
    @{
        URL = "https://picsum.photos/400/400"
        Filename = "testimonial2.jpg"
    },
    @{
        URL = "https://picsum.photos/400/400"
        Filename = "testimonial3.jpg"
    },
    @{
        URL = "https://picsum.photos/300/200"
        Filename = "brand1.png"
    },
    @{
        URL = "https://picsum.photos/300/200"
        Filename = "brand2.png"
    },
    @{
        URL = "https://picsum.photos/300/200"
        Filename = "brand3.png"
    },
    @{
        URL = "https://picsum.photos/300/200"
        Filename = "brand4.png"
    },
    @{
        URL = "https://picsum.photos/300/200"
        Filename = "brand5.png"
    },
    @{
        URL = "https://picsum.photos/300/200"
        Filename = "brand6.png"
    },
    @{
        URL = "https://picsum.photos/300/200"
        Filename = "brand7.png"
    },
    @{
        URL = "https://picsum.photos/300/200"
        Filename = "brand8.png"
    },
    @{
        URL = "https://picsum.photos/800/600"
        Filename = "gallery1.jpg"
    },
    @{
        URL = "https://picsum.photos/800/600"
        Filename = "gallery2.jpg"
    },
    @{
        URL = "https://picsum.photos/800/600"
        Filename = "gallery3.jpg"
    },
    @{
        URL = "https://picsum.photos/800/600"
        Filename = "gallery4.jpg"
    },
    @{
        URL = "https://picsum.photos/800/600"
        Filename = "gallery5.jpg"
    },
    @{
        URL = "https://picsum.photos/800/600"
        Filename = "gallery6.jpg"
    },
    @{
        URL = "https://picsum.photos/1600/900"
        Filename = "pattern.png"
    }
)

# Download each image
foreach ($image in $imageList) {
    $outputPath = Join-Path -Path "images" -ChildPath $image.Filename
    Write-Host "Downloading $($image.Filename)..."
    try {
        # Add a random seed to ensure unique images
        $randomSeed = Get-Random -Minimum 1 -Maximum 1000
        $uniqueUrl = "$($image.URL)?random=$randomSeed"
        Invoke-WebRequest -Uri $uniqueUrl -OutFile $outputPath
        Write-Host "Downloaded $($image.Filename) successfully." -ForegroundColor Green
    } catch {
        Write-Host "Failed to download $($image.Filename): $_" -ForegroundColor Red
    }
}

Write-Host "All images downloaded successfully!" -ForegroundColor Green 