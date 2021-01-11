enum TypeEnum {
  Image = 'image',
  PDF = 'pdf',
  Video = 'video'
}

export type FileType = {
  name: string,
  developer?: string,
  type: 'image' | 'pdf' | 'video'
}
