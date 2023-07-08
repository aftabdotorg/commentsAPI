const express = require('express');
const path = require('path');
const { v4: uuid } = require('uuid');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

let comments = [
  {
    id: uuid(),
    username: 'Tony',
    comment: 'This is hilarious!',
  },
  {
    id: uuid(),
    username: 'Hawkeye',
    comment: 'Absolutely!',
  },
  {
    id: uuid(),
    username: 'Thanos',
    comment: 'Reducer OP!',
  },
  {
    id: uuid(),
    username: 'Sherlock',
    comment: 'Watson is great!',
  },
];

// console.table(comments)

// * GET /comments

app.get('/comments', (req, res) => {
  res.render('comments/index', { comments });
});

app.get('/comments/new', (req, res) => {
  res.render('comments/new');
});

app.post('/comments', (req, res) => {
  const { username, comment } = req.body;
  // ! this encrypted data will be decoded by middleware declared abive called urlencoded
  comments.push({ username, comment, id: uuid() });
  res.redirect('/comments');
});

app.get('/comments/:id', (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render('comments/details', { comment });
});

app.get('/comments/:id/edit', (req, res) => {
  const { id } = req.params;
  const foundComment = comments.find((c) => {
    c.id === id;
  });
  res.render('comments/edit', { foundComment });
});

app.patch('/comments/:id', (req, res) => {
  const { id } = req.params;
  const foundComment = comments.find((c) => {
    c.id === id;
  });

  const { newCommentText } = req.body;
  foundComment.comment = newCommentText;
  res.redirect('/comments');
});

app.listen(3000, () => {
  console.log('server up and running on 3000...');
});
