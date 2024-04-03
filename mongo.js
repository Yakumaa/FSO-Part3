const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://maharjanshrish8:${password}@cluster0.nzvzua0.mongodb.net/phoonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', phonebookSchema)

const person = new Person({
  "name": "Barto Hellas", 
  "number": "040-123456"
})

person.save().then(result => {
  console.log('person saved!')
  // mongoose.connection.close()
})

Person.find({}).then(result => {
  result.forEach(person => {
    console.log(person)
  })
  mongoose.connection.close()
})