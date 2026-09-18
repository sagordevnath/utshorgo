import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import { seedResellers, seedProducts } from './data.js';

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error(
    'Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in server/.env before seeding.\n' +
      'Run the SQL in supabase/schema.sql first (SQL Editor → paste → Run).'
  );
  process.exit(1);
}

const supabase = createClient(url, key, { auth: { persistSession: false } });

const { error: resellerError } = await supabase.from('resellers').upsert(seedResellers, { onConflict: 'id' });
if (resellerError) {
  console.error('Failed to seed resellers:', resellerError.message);
  process.exit(1);
}

const products = seedProducts.map(({ reseller_name, ...rest }) => rest);
const { error: productError } = await supabase.from('products').upsert(products, { onConflict: 'id' });
if (productError) {
  console.error('Failed to seed products:', productError.message);
  process.exit(1);
}

console.log(`Seeded ${seedResellers.length} resellers and ${products.length} products.`);
