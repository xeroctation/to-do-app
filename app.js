
// third party libs
const express = require('express')
const app = express()

// node libs
const fs = require('fs')
const PORT = 666

app.set('view engine', 'pug')
app.use('/static', express.static('assets'))
app.use(express.urlencoded({ extended: false }))

// localhost:666 
app.get('/',(req, res) => {
    fs.readFile('./data/todos.json', (err, data) => {
        if(err) throw err

        const todos = JSON.parse(data)

        res.render('index', { todos: todos })
    }) 
})

app.post('/add', (req, res) => {
    const formData = req.body

    if(formData.todo.trim() == ''){
        fs.readFile('./data/todos.json', (err, data) => {
            if (err) throw err

            const todos = JSON.parse(data)

            res.render('index', { error: true, todos: todos })
        })
    }   else{
        fs.readFile('./data/todos.json', (err, data) => {
            if (err) throw err

            const todos = JSON.parse(data)

            const todo = {
                id: id(),
                description: formData.todo,
                done: false
            }

            todos.push(todo)

            fs.writeFile('./data/todos.json', JSON.stringify(todos), (err) => {
                if (err) throw err

                fs.readFile('./data/todos.json', (err, data) => {
                    if (err) throw err

                    const todos = JSON.parse(data)

                    res.render('index', { success: true, todos: todos })
                })
            })
        })
    }
})

app.get('/:id/delete1', (req, res) => {
    const id = req.params.id

    fs.readFile('./data/todos.json', (err, data) => {
        if (err) throw err

        const todos = JSON.parse(data)

        const filteredTodos = todos.filter(todo => todo.id != id)

        fs.writeFile('./data/todos.json', JSON.stringify(filteredTodos), (err) => {
            if (err) throw err
            
            res.render('index', { todos: filteredTodos, delete1: true })
        })
    })
})

app.get('/:id/update', (req, res) => {
    const id = req.params.id
     
    fs.readFile('./data/todos.json', (err, data) => {
        if (err) throw err

        const todos = JSON.parse(data)
        const todo = todos.filter(todo => todo.id == id)[0]

        const todoIdx = todos.indexOf(todo)
        const splicedTodo = todos.splice(todoIdx, 1)[0]

        splicedTodo.done = true

        todos.push(splicedTodo)

        fs.writeFile('./data/todos.json', JSON.stringify(todos), (err) => {
            if (err) throw err
            
            res.render('index', { todos: todos })
        })
    })
        
})


app.listen(PORT, (err) => {
    if(err) throw err

    console.log(`This app is running on port ${ PORT }`)
}) 



function id () {
    return '_' + Math.random().toString(36).substr(2, 9)
  }