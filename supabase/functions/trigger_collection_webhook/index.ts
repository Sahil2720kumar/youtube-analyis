import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from 'jsr:@supabase/supabase-js@2'

Deno.serve(async (req) => {
  const data = await req.json()
  const snapshotId = req.headers.get('snapshot-id')

  //create a supabase client
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
  )

  const { input,timestamp, ...insertChannelData } = data[0]; // Exclude "input"
  console.log("headers: ", req.headers)
  console.log("Authorization: ", req.headers.get('Authorization'));
  console.log("snapshotId: ", snapshotId);
  console.log("data: ", insertChannelData)

  //insert channel data into supabase
  const { data: channelData, error: channelError } = await supabase.from('yt_channels').insert(insertChannelData)
  if (channelError) {
    console.log("channelError: ", channelError)
    return new Response(JSON.stringify({ error: 'Failed to insert channel data', status: channelError.status }), { status: 200 })
  }

  //update the status of the scrape job
  const { data: updateData, error: updateError } = await supabase.from('scrape_jobs').update({ status: 'ready',channel_id: insertChannelData.id }).eq('id', snapshotId)
  if (updateError) {
    return new Response(JSON.stringify({ error: 'Failed to update scrape job status', status: updateError.status }), { status: 200 })
  }

  return new Response(
    JSON.stringify({ status: 200, message: "Webhook received" }),
    { headers: { "Content-Type": "application/json" } }
  )
})

