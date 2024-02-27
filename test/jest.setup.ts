module.exports = () => {
  process.env.PAYLOAD_DISABLE_ADMIN = 'true'
  process.env.PAYLOAD_DROP_DATABASE = 'true'

  if (process.env.PAYLOAD_DATABASE) {
    console.log('\n\nUsing database:', process.env.PAYLOAD_DATABASE)
  } else {
    console.log('\n\nNo database specified, using default')
  }

  process.env.PAYLOAD_PUBLIC_CLOUD_STORAGE_ADAPTER = 's3'
}
