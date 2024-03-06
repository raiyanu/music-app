# for creating thumbnail using fish shell and ffmpeg

```bash
mkdir thumbnails
for file in *.mp3
    ffmpeg -i $file -vf thumbnail -frames:v 1 thumbnails/(basename $file .mp3).png
end

```
