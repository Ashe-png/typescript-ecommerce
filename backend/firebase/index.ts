import * as admin from 'firebase-admin';
import serviceAccount from '../config/fbServiceAcccountKey.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL: 'https://ecom-4b6a0-default-rtdb.firebaseio.com',
});

export default admin;
