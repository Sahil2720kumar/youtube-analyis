import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'jsr:@supabase/supabase-js@2';

const saveChannelData = async (supabase: any, data: any) => {
  const { data: channelData, error: channelError } = await supabase
    .from('yt_channels')
    .insert(data)
    .select('id')
    .single();
  if (channelError) {
    console.log('channelError: ', channelError);
    throw new Error('Failed to insert channel data');
  }
  return channelData;
};

const saveVideoData = async (supabase: any, data: any) => {
  // Transform data to match table columns
  const videoData = data.map((item: any) => ({
    id: item.video_id,
    url: item.url,
    title: item.title,
    video_length: item.video_length,
    likes: item.likes,
    views: item.views,
    date_posted: item.date_posted,
    description: item.description,
    num_comments: item.num_comments,
    preview_image: item.preview_image,
    shortcode: item.shortcode,
    transcript: item.transcript,
    hashtags: item.hashtags,
    youtuber_id: item.youtuber_id,
    verified: item.verified,
  }));

  const { data: insertedVideoData, error: videoError } = await supabase
    .from('yt_videos')
    .upsert(videoData)
    .select('id');
  if (videoError) {
    console.log('videoError: ', videoError);
    throw new Error('Failed to insert video data');
  }
  return insertedVideoData;
};

const saveCommentsData = async (supabase: any, commentsData: any) => {
  // Transform comments data to match table columns
  const transformedCommentsData = commentsData.map((comment: any) => ({
    id: comment.comment_id,
    comment_text: comment.comment_text,
    likes: comment.likes,
    replies: comment.replies,
    username: comment.username,
    user_channel: comment.user_channel,
    date: comment.date,
    url: comment.url,
    video_id: comment.video_id,
    user_id: comment.user_id,
  }));

  const { data: insertedCommentsData, error: commentsError } = await supabase
    .from('yt_comments') // Replace with your actual comments table name
    .upsert(transformedCommentsData)
    .select('id');

  if (commentsError) {
    console.log('commentsError: ', commentsError);
    throw new Error('Failed to insert comments data');
  }

  return insertedCommentsData;
};

Deno.serve(async (req) => {
  const data = await req.json();
  const snapshotId = req.headers.get('snapshot-id');
  const YT_CHANNELS_DATASET_ID = 'gd_lk538t2k2p1k3oos71';
  const YT_VIDEOS_DATASET_ID = 'gd_lk56epmy2i5g7lzu0k';
  const YT_COMMENTS_DATASET_ID = 'gd_lk9q0ew71spt1mxywf';

  //create a supabase client
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
  );

  console.log('headers: ', req.headers);
  console.log('Authorization: ', req.headers.get('Authorization'));
  console.log('snapshotId: ', snapshotId);
  console.log('data: ', data);

  //fetch the  datasetId from the snapshotId
  let { data: datasetId, error: datasetIdError } = await supabase
    .from('scrape_jobs')
    .select('dataset_id')
    .eq('id', snapshotId)
    .single();
  if (datasetIdError) {
    console.log('datasetIdError: ', datasetIdError);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch datasetId', status: datasetIdError.status }),
      { status: 200 }
    );
  }

  let insertData: any;
  if (datasetId?.dataset_id === YT_CHANNELS_DATASET_ID) {
    const { input, timestamp, ...insertUpdateData } = data[0]; // Exclude "input"
    insertData = insertUpdateData;
    console.log('insertData: ', insertData);
  } else if (datasetId?.dataset_id === YT_VIDEOS_DATASET_ID) {
    insertData = data.map((item: any) => {
      const { input, timestamp, ...insertUpdateData } = item; // Exclude "input"
      return insertUpdateData;
    });
    console.log('insertData: ', insertData);
  } else if (datasetId.dataset_id === YT_COMMENTS_DATASET_ID) {
    insertData = data.map((item: any) => {
      const { input, timestamp, ...insertUpdateData } = item; // Exclude "input"
      return insertUpdateData;
    });
    console.log('insertData: ', insertData);
  }

  let channelData: any;
  let videoData: any;
  let commentsData: any;
  console.log('datasetId: ', datasetId);
  if (datasetId?.dataset_id === YT_CHANNELS_DATASET_ID) {
    try {
      //insert channel data into supabase
      console.log('inserting channel data into supabase');
      channelData = await saveChannelData(supabase, insertData);
      console.log('channelData: ', channelData);
    } catch (error) {
      console.log('Channel Insertion Error: ', error);
      return new Response(
        JSON.stringify({ error: 'Failed to insert channel data', status: error.status }),
        { status: 200 }
      );
    }
  } else if (datasetId?.dataset_id === YT_VIDEOS_DATASET_ID) {
    try {
      //insert video data into supabase
      console.log('inserting video data into supabase');
      videoData = await saveVideoData(supabase, insertData);
      console.log('videoData: ', videoData);
    } catch (error) {
      console.log('Video Insertion Error: ', error);
      return new Response(
        JSON.stringify({ error: 'Failed to insert video data', status: error.status }),
        { status: 200 }
      );
    }
  } else if (datasetId.dataset_id === YT_COMMENTS_DATASET_ID) {
    try {
      //insert video data into supabase
      console.log('inserting comments data into supabase');
      commentsData = await saveCommentsData(supabase, insertData);
      console.log('commentsData', commentsData);
    } catch (error) {
      console.log('comment Insertion Error: ', error);
      return new Response(
        JSON.stringify({ error: 'Failed to insert comment data', status: error.status }),
        { status: 200 }
      );
    }
  }

  // TODO: Update the status of the scrape job
  //update the status of the scrape job
  if (channelData || videoData || commentsData) {
    const { data: updateData, error: updateError } = await supabase
      .from('scrape_jobs')
      .update({
        status: 'ready',
        channel_id:
          datasetId.dataset_id === YT_CHANNELS_DATASET_ID
            ? insertData.id
            : insertData?.[0]?.youtuber_id,
      })
      .eq('id', snapshotId)
      .select('*');
    console.log('updateData Scrape Job: ', updateData);
    if (updateError) {
      console.log('updateError Scrape Job: ', updateError);
      return new Response(
        JSON.stringify({ error: 'Failed to update scrape job status', status: updateError.status }),
        { status: 200 }
      );
    }
  }

  return new Response(JSON.stringify({ status: 200, message: 'Webhook received' }), {
    headers: { 'Content-Type': 'application/json' },
  });
});
