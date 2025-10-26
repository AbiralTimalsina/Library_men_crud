import app from './app.js';
import { connect } from './db/mongoose.js';
import { env } from './config/env.js';

async function main(){
  await connect(env.MONGODB_URI);
  app.listen(env.PORT, () => console.log(`Server running at http://localhost:${env.PORT}`));
}

main().catch(err => { console.error(err); process.exit(1); });
