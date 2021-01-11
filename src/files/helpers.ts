import { extname } from 'path'
import { HttpException, HttpStatus } from '@nestjs/common'
import { pseudoRandomBytes } from 'crypto'

// Allow only images
export const filterFileType = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|mp4|pdf)$/)) {
    return callback(
      new HttpException(
        'Only jpg|jpeg|png|gif|mp4 files are allowed!',
        HttpStatus.BAD_REQUEST,
      ),
      false,
    );
  }
  callback(null, true)
};

export const editFileName = (req, file, callback) => {
  pseudoRandomBytes(16, function (err, raw) {
    if (err) return callback(err)

    callback(null, raw.toString('hex') + extname(file.originalname))
  })
}

export const getFileType = (originalname: string): string => {
  const extension = extname(originalname).substring(1)

  switch (extension) {
    case 'jpg' || 'jpeg' || 'png' || 'gif':
      return 'image'
    case 'pdf':
      return 'pdf'
    case 'mp4':
      return 'video'
    default:
      return 'image'
  }
}
