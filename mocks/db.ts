import { faker } from '@faker-js/faker';
import { factory, primaryKey, oneOf, nullable } from '@mswjs/data';

function* generateAutoIncrement(): Generator<number, number> {
  let id = 1;

  while (true) {
    yield id++;
  }
}

const userSequence = generateAutoIncrement();

export const db = factory({
  // A "task" model that describes what properties
  // each task has.
  task: {
    id: primaryKey(faker.datatype.uuid),
    title: () => faker.random.words(5),
    isDone: Boolean,
    // owner: oneOf('user'),
  },
  user: {
    id: primaryKey(() => userSequence.next().value),
    name: String,
    email: String,
    password: nullable(String),
    createdAt: () => new Date(),
    updatedAt: () => new Date(),
  },
});

// The default tasks created each time you refresh the page.
db.task.create({ title: 'Visit the demo', isDone: true });
db.task.create({ title: 'Explore the sandbox' });
db.task.create({ title: 'Learn about Data' });
db.task.create({ title: 'Install and try it out yourself' });
