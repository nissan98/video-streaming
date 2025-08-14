import ffmpeg from "fluent-ffmpeg"

const convertVideoToStreams = (path, outputPath) => {
  return new Promise((res, rej) => {
    ffmpeg(path)
      .videoCodec("copy")
      .outputOption([
        '-hls_time 10',
        '-hls_list_size 0',
        '-hls_segment_filename ' + outputPath + 'segment%03d.ts', // Naming convention for segments
        '-f hls' // Output format as
      ])
      .output(outputPath + "video.m3u8")
      .on("start", () => {
        console.log("Video transcoding statred")
      })
      .on('end', () => {
        res("")
        console.log("video converted to hls")
      })
      .on("error", (e) => {
        rej("")
        console.log("video conversion failed", e.message)
      })
      .run()

  })
}

export { convertVideoToStreams }
