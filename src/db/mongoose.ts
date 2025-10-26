import mongoose from 'mongoose';
export async function connect(uri: string){
  mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${uri}`);
  });
  mongoose.set('strictQuery', true);
  await mongoose.connect(uri);
}
export async function disconnect(){
  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
  });
  await mongoose.disconnect();
}
