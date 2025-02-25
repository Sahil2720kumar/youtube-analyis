import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from 'jsr:@supabase/supabase-js@2'

Deno.serve(async (req) => {
  const { url } = await req.json()

  const token = Deno.env.get('BRIGHT_DATA_API_KEY')

  if (!token) {
    return new Response(JSON.stringify({ error: 'No token found',status:404 }), { status: 200 })
  }

  const options = {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify([{ url: url }])
  };

  //curl -H "Authorization: Bearer fc72cd7fec99906d0afd837ce8b6c52183330b918f4ba7966facc1fe0aa7158c" -H "Content-Type: application/json" -d '[{"url":"https://www.youtube.com/@MrBeast/about"},{"url":"https://www.youtube.com/@jaidenanimations/about"}]' "https://api.brightdata.com/datasets/v3/trigger?dataset_id=gd_lk538t2k2p1k3oos71&endpoint=https://hmewkaalrgzmwttwhznh.supabase.co/functions/v1/trigger_collection_webhook&format=json&uncompressed_webhook=true&include_errors=true"

  const response = await fetch('https://api.brightdata.com/datasets/v3/trigger?dataset_id=gd_lk538t2k2p1k3oos71&endpoint=https://hmewkaalrgzmwttwhznh.supabase.co/functions/v1/trigger_collection_webhook&format=json&uncompressed_webhook=true&include_errors=true', options)

  if (!response.ok) {
    return new Response(JSON.stringify({ error: 'Failed to trigger collection',status:response.status }), { status: 200 })
  }

  const data = await response.json()


  console.log("DATA: ", data)

  //store collection id in supabase
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
  )

  const { data:insertData, error:insertError } = await supabase.from('scrape_jobs').insert({ id: data.snapshot_id, status: 'running' }).select().single()

  
  if (insertError) {
    return new Response(JSON.stringify({ error: 'Failed to store collection id',status:insertError.status }), { status: 200 })
  }

  return new Response(
    JSON.stringify(insertData),
    { headers: { "Content-Type": "application/json" } },
  )
})

