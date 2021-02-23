import axios from 'axios'

const handleUpload = async (image) => {
  console.log('masuk upload')
  console.log(image)
  let newFile = {
    uri: image.uri,
    type: `img/${image.uri.split(".")[1]}`,
    name: `img.${image.uri.split(".")[1]}`
  }
  const data = new FormData()
  data.append('file', newFile)
  data.append('upload_preset', 'curhatDongMah')
  data.append('cloud_name', 'kanzf')
  console.log(data)

  const result = await axios({
    url: 'https://api.cloudinary.com/v1_1/kanzf/image/upload',
    method: 'POST',
    data: data
  })
  // console.log(result.data.url, "ini dari axios")
  // setValue({ ...value, photoUrl: result.data.url})
  return result.data.url

} 

export default handleUpload