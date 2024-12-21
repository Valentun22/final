import { BadRequestException } from '@nestjs/common';

export const imageFileFilter = (req, file, callback) => {
  const allowedExtensions = ['jpg', 'jpeg', 'png'];
  const fileExtension = file.originalname.split('.').pop().toLowerCase();
  const isValidExtension = allowedExtensions.includes(fileExtension);

  if (!isValidExtension) {
    return callback(
      new BadRequestException('The file format is not supported'),
      false,
    );
  }

  callback(null, true);
};
