import ffmpeg from "fluent-ffmpeg"

const convertVideoToStreams = (path, outputPath) => {
  //fluent-ffmpeg is depriciated this is a personal project so its fine for now 
  return new Promise((res, rej) => {
    ffmpeg(path)
      .videoCodec("copy")
      .outputOption([
        '-hls_time 10',
        '-hls_list_size 0',
        '-hls_segment_filename ' + outputPath + 'segment%03d.ts', 
        '-f hls' // Output format as hls
      ])
      .output(outputPath + "video.m3u8")
      .on('end', () => {
        res("file upload done")
      })
      .on("error", (e) => {
        rej("")
      })
      .run()

  })
}

export { convertVideoToStreams }
