const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// do I need to force: false here???
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
});
