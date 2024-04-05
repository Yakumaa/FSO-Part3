require('dotenv').config()
const express = require('express')
var morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

app.use(express.json())
app.use(express.static('dist'))
app.use(cors())

morgan.token('body', function (req, res) { 
  return JSON.stringify(req.body) 
})

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
app.use(requestLogger)

let persons = [
  // { 
  //   "id": 1,
  //   "name": "Arto Hellas", 
  //   "number": "040-123456"
  // },
  // { 
  //   "id": 2,
  //   "name": "Ada Lovelace", 
  //   "number": "39-44-5323523"
  // },
  // { 
  //   "id": 3,
  //   "name": "Dan Abramov", 
  //   "number": "12-43-234345"
  // },
  // { 
  //   "id": 4,
  //   "name": "Mary Poppendieck", 
  //   "number": "39-23-6423122"
  // }
]

// app.get('/', (request, response) => {
//   response.send('<h1>Hello World!</h1>')
// })

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body')) 

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/info', (request, response) => {
  response.send(`<p>Phonebook has info for ${persons.length} people <br/> ${new Date()} </p>`)
})
// app.use(requestLogger)

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(p => p.id !== id)

  response.status(204).end()
})

// const generateId = () => {
//   const randomId = Math.floor(Math.random() * 1000)
//   return randomId
// }

app.post('/api/persons', (request, response) => {
  const body = request.body
  console.log(body)
  if (!body.name) {
    return response.status(400).json({
      error: 'name missing'
    })
  }
  if (!body.number) {
    return response.status(400).json({
      error: 'number missing'
    })
  }
  if (persons.find(p => p.name === body.name)) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
    // id: generateId(),
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})