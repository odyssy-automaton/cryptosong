require("dotenv").config();
const ProgressBar = require("progress");
const fs = require("fs");
const certFileBuf = fs.readFileSync(
  __dirname + "/../rds-combined-ca-bundle.pem"
);

const Schema = require("mongoose").Schema;

const mongoose = require("mongoose");
mongoose.Promise = Promise;

const isInLambda = !!process.env.LAMBDA_TASK_ROOT;

const options = {
  promiseLibrary: global.Promise,
  useNewUrlParser: true
};

// if (isInLambda) {
//   options.ssl = true;
//   options.sslCA = certFileBuf;
// }

mongoose.connect(process.env.MONGODB_HOST, options);

const db = mongoose.connection;
db.dropDatabase();

const songList = [
  {
    number: 1,
    date: "2009-01-01T05:00:00.000Z",
    title: "In the Time of the Gods",
    length: "2:36",
    inkey: "C",
    tempo: 61,
    topic: "Poetic",
    location: "Los Angeles",
    instruments: "Vocals, Baritone Uke",
    beard: "N/A",
    videoid: "https://youtu.be/v6Lk_OP4ZKc",
    description:
      "First song for Fun A Day! It’s called “In The Time of the Gods”. I wish I had better guitars. I’m using a baritone ukulele that won’t stay in tune!",
    acousticproduced: "Produced",
    firsts: "First song.",
    mood: "Pensive",
    spotify: "https://open.spotify.com/track/5M2qwk6euYPqsxXvMXFyyM",
    itunes:
      "https://itunes.apple.com/ph/album/in-the-time-of-the-gods/1132700498?i=1132700609",
    bandcamp: "https://jonathanmann.bandcamp.com/track/in-the-time-of-the-gods",
    tags: "Folk, Delicate,Narrative, Myth "
  },
  {
    number: 2,
    date: "2009-01-02T05:00:00.000Z",
    title: "Hands (Oh No!)",
    length: "3:09",
    inkey: "F",
    tempo: 100,
    topic: "Poetic",
    location: "Los Angeles",
    instruments: "Vocals, Baritone Uke",
    beard: "N/A",
    videoid: "https://youtu.be/ojUAssDIqic",
    description:
      "Song two for Fun A Day! It’s called “Hands (Oh No!)” I wish I was better at whistling. It sounds kind of creepy though.",
    acousticproduced: "Produced",
    mood: "Sad",
    spotify: "https://open.spotify.com/track/0Eh6pZdVIFDXj0TrZSQg9p",
    itunes:
      "https://itunes.apple.com/ph/album/hands-oh-no/1132700498?i=1132700610",
    bandcamp: "https://jonathanmann.bandcamp.com/track/hands-oh-no",
    tags: "Folk, Dark, "
  },
  {
    number: 3,
    date: "2009-01-03T05:00:00.000Z",
    title: "Who Do You Think You Are",
    length: "2:12",
    inkey: "Am",
    tempo: 110,
    topic: "Poetic",
    location: "Los Angeles",
    instruments: "Vocals, Baritone Uke",
    beard: "N/A",
    videoid: "https://youtu.be/tRrTEB50cCE",
    description:
      "3rd song for Fun A Day! It’s called “Who Do You Think You Are?”. It’s pretty weird. It’s kind of like my worst nightmare. Judgement.",
    acousticproduced: "Produced",
    mood: "Anxious",
    spotify: "https://open.spotify.com/track/6cHw97andNYEOE45oRVgwG",
    itunes:
      "https://itunes.apple.com/ph/album/who-do-you-think-you-are/1132700498?i=1132700611",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/who-do-you-think-you-are",
    tags: "Electro, Dark, Cheesy, Narrative, Funny"
  },
  {
    number: 4,
    date: "2009-01-04T05:00:00.000Z",
    title: "Elegy for industry",
    length: "2:20",
    inkey: "Em",
    tempo: 130,
    topic: "Poetic",
    location: "Los Angeles",
    instruments: "Vocals, Synths, Drum Machine",
    beard: "N/A",
    videoid: "https://youtu.be/57gN8EZJE2A",
    description:
      "Song 4! Elegy For Industry. Strange. Kind of cheesy. Let me know what you think!",
    acousticproduced: "Produced",
    comments: "Songfight song.",
    mood: "Sad",
    spotify: "https://open.spotify.com/track/4x4mPfqo9ggQD7kPfpWZ6E",
    itunes:
      "https://itunes.apple.com/ph/album/elegy-for-industry/1132700498?i=1132700612",
    bandcamp: "https://jonathanmann.bandcamp.com/track/elegy-for-industry",
    tags: "Electro, Dark,Narrative"
  },
  {
    number: 5,
    date: "2009-01-05T05:00:00.000Z",
    title: "The Airport Song",
    length: "1:13",
    inkey: "D",
    tempo: 59,
    topic: "Airport",
    location: "Los Angeles",
    instruments: "Vocals, Baritone Uke",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=kLzFYvZkX7c",
    description:
      "Song #5 for Song A Day! I made it at LAX. In 20 min. While trying to not make too big a scene. Also got some time lapse of the gate I was waiting at. Yay!",
    acousticproduced: "Produced",
    firsts: "First video.",
    comments: "Made in an airport.",
    mood: "Chill",
    spotify: "https://open.spotify.com/track/3Pq8uDm9mY6NpAEFtlMDJV",
    itunes:
      "https://itunes.apple.com/ph/album/the-airport-song/1132700498?i=1132700613",
    bandcamp: "https://jonathanmann.bandcamp.com/track/the-airport-song",
    tags: "Folk, Wistful, Personal, Travel"
  },
  {
    number: 6,
    date: "2009-01-06T05:00:00.000Z",
    title: "It Must Be the Weather",
    length: "3:50",
    inkey: "Gm",
    tempo: 65,
    topic: "Life",
    location: "New York",
    instruments: "Vocals, Baritone Uke",
    beard: "N/A",
    videoid: "https://youtu.be/n3ckq1Pa64g",
    description: "N/A",
    acousticproduced: "Acoustic",
    firsts: "First song in New York.",
    comments: "Recorded in the bathroom.",
    mood: "Pensive",
    spotify: "https://open.spotify.com/track/5O2EpSTQxdafnl8sr1WDGY",
    itunes:
      "https://itunes.apple.com/ph/album/it-must-be-the-weather/1132700498?i=1132700614",
    bandcamp: "https://jonathanmann.bandcamp.com/track/it-must-be-the-weather",
    tags: "Blues, Dark, Personal, Weather"
  },
  {
    number: 7,
    date: "2009-01-07T05:00:00.000Z",
    title: "EGM, 1up, Goodbye",
    length: "2:37",
    inkey: "Em",
    tempo: 96,
    topic: "Video Games",
    location: "New York",
    instruments: "Vocals, Baritone Uke",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=mzFyM0SCpOs",
    description:
      "A song I wrote today for Ryan and Matt and everyone else at 1up and EGM that lost their jobs yesterday. It's made me so unbelievably sad. First, they're my friends, and what they created and worked on, the 1up Show, was far and away the best gaming content anywhere, period. I'm going to miss my weekly dose of 1up Yours, 1up FM and The 1up Show, and boy am I going to miss getting EGM in the mail! Love! On to bigger and better things! All of you!",
    acousticproduced: "Acoustic",
    firsts: "First stairwell song.",
    comments: "Written for the closing of EGM.",
    mood: "Sad",
    spotify: "https://open.spotify.com/track/66GDxpCpJxR4QneLZpOdF3",
    itunes:
      "https://itunes.apple.com/ph/album/egm-1up-goodbye/1132700498?i=1132700615",
    bandcamp: "https://jonathanmann.bandcamp.com/track/egm-1up-goodbye",
    tags: "Folk, Dark, Personal, "
  },
  {
    number: 8,
    date: "2009-01-08T05:00:00.000Z",
    title: "Boy for Boy's Sake",
    length: "2:23",
    inkey: "D",
    tempo: 50,
    topic: "Poetic",
    location: "New York",
    instruments: "Vocals, Baritone Uke",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=qLjYVzYGg-M",
    description:
      "Song # 8 for Song A Day! It’s called “Boy For Boy’s Sake”. Yay!",
    acousticproduced: "Acoustic",
    mood: "Pensive",
    spotify: "https://open.spotify.com/track/4qUljFPUQX4Kyn8KCbBnq9",
    itunes:
      "https://itunes.apple.com/ph/album/boy-for-boys-sake/1132700498?i=1132700616",
    bandcamp: "https://jonathanmann.bandcamp.com/track/boy-for-boys-sake",
    tags: "Folk, Light, "
  },
  {
    number: 9,
    date: "2009-01-09T05:00:00.000Z",
    title: "The Deutsch Positivity Anthem",
    length: "2:59",
    inkey: "Bb",
    tempo: 170,
    topic: "Commission",
    location: "New York",
    instruments: "Vocals, Baritone Uke",
    beard: "N/A",
    videoid: "https://youtu.be/pvweusx-cAk",
    description:
      "This one is called “The Deutsch Positivity Anthem”. It was written for Ivory’s mom’s boss, who sent out an email to everyone in the creative group at Deutsch (an ad agency) saying that he wanted to be inundated with “positivity” ideas on Monday, the 12th. So I wrote this Positivity Anthem for her to present to him.",
    acousticproduced: "Produced",
    firsts: "First commission",
    comments:
      "My ex's mom commissioned a \nsong for the company she worked at.",
    mood: "Happy",
    spotify: "https://open.spotify.com/track/4qUljFPUQX4Kyn8KCbBnq9",
    itunes:
      "https://itunes.apple.com/ph/album/the-deutsch-positivity-anthem/1132700498?i=1132700617",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/the-deutsch-positivity-anthem",
    tags: "Electro, Cheesy,Motivational"
  },
  {
    number: 10,
    date: "2009-01-10T05:00:00.000Z",
    title: "The Three Rules of the internet",
    length: "3:07",
    inkey: "D",
    tempo: 100,
    topic: "Internet",
    location: "New York",
    instruments: "Vocals, Baritone Uke",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=GWSP2c9J8CQ",
    description: "This goes out to all you haters!!",
    acousticproduced: "Acoustic",
    firsts: "First viral song.",
    comments: "Viral",
    press: "https://boingboing.net/2009/01/11/folk-song-containing.html",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/2Oh81hnjKpPkLt8d6HLDt2",
    itunes:
      "https://itunes.apple.com/ph/album/the-three-rules-of-the-internet/1132700498?i=1132700618",
    bandcamp: "https://jonathanmann.bandcamp.com/track/3-rules-of-the-internet",
    tags: "Folk,Funny, Nerd"
  },
  {
    number: 11,
    date: "2009-01-11T05:00:00.000Z",
    title: "Song a Day Anthem",
    length: "3:09",
    inkey: "D",
    tempo: 85,
    topic: "Song A Day",
    location: "New York",
    instruments: "Vocals, Baritone Uke",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=OfAITTY-CCU",
    description:
      "While riding on the train from CT to NYC, I wrote this song about writing a song a day. Very meta. It's the anthem for anyone wanting to be creative! It feels good to feel inspired.",
    acousticproduced: "Acoustic",
    comments: "Written on a train.",
    mood: "Happy",
    spotify: "https://open.spotify.com/track/50vgw3vSnUa9s1eSnsYh7a",
    itunes:
      "https://itunes.apple.com/ph/album/song-a-day-anthem/1132700498?i=1132700619",
    bandcamp: "https://jonathanmann.bandcamp.com/track/song-a-day-anthem",
    tags: "Folk, Fun, Personal, Motivational"
  },
  {
    number: 12,
    date: "2009-01-12T05:00:00.000Z",
    title: "Everyone's a Little Bit Queer",
    length: "5:03",
    inkey: "B",
    tempo: 80,
    topic: "Social Justice",
    location: "New York",
    instruments: "Vocals, Baritone Uke",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=D5TMZc9gzt4",
    description: "Song # 12 for Song-A-Day! It's pretty self explanatory.",
    acousticproduced: "Acoustic",
    firsts: "First social justice song.",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/6zbTmN7RK9HpxHx5iG57m4",
    itunes:
      "https://itunes.apple.com/ph/album/everyones-a-little-bit-queer/1132700498?i=1132700620",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/everyones-a-little-bit-queer",
    tags: "Folk, Fun,Funny"
  },
  {
    number: 13,
    date: "2009-01-13T05:00:00.000Z",
    title: "What Does It Mean to Love a Machine?",
    length: "4:45",
    inkey: "Bm",
    tempo: 102,
    topic: "Sex",
    location: "New York",
    instruments: "Vocals, Baritone Uke",
    beard: "Shadow",
    videoid: "https://vimeo.com/2819199",
    description:
      'If you like sci-fi, robots, and sex, this is the song for you. Originally written for Monochrom\'s Arse Elektronika, I appropriated it for my Song-A-Day project. Contains lines like: "There was Data, there was Troi, in a sexual position called the Spock-McCoy."',
    acousticproduced: "Produced",
    comments: "Rejected from YouTube for being very NSFW.",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/4rIMBeUAPODU38HmNOOmyc",
    itunes:
      "https://itunes.apple.com/ph/album/what-does-it-mean-to-love-a-machine/1132700498?i=1132700651",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/what-does-it-mean-to-love-a-machine",
    tags: "Folk, Distortion, Raunchy. Narrative, Funny, Robots"
  },
  {
    number: 14,
    date: "2009-01-14T05:00:00.000Z",
    title: "I'm Drunk Because the Economy Sucks",
    length: "2:44",
    inkey: "F#",
    tempo: 35,
    topic: "Politics",
    location: "New York",
    instruments: "Vocals, Baritone Uke",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=tzAz5HzjBsw",
    description:
      "“I’m Drunk Because The Economy Sucks”. Wrote it after having drinks with a bar full of Ivory’s mom’s coworkers who’ve just been laid off. It’s happening.",
    acousticproduced: "Acoustic",
    firsts: "First politics song.",
    mood: "Drunk",
    spotify: "https://open.spotify.com/track/0NnIXMau8xhB0M7TzTxajA",
    itunes:
      "https://itunes.apple.com/ph/album/im-drunk-because-the-economy-sucks/1132700498?i=1132700652",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/im-drunk-because-the-economy-sucks",
    tags: "Folk, Frustrated, Political, Economy"
  },
  {
    number: 15,
    date: "2009-01-15T05:00:00.000Z",
    title: "Get Well, Steve Jobs",
    length: "3:58",
    inkey: "F#",
    tempo: 95,
    topic: "Apple",
    location: "New York",
    instruments: "Vocals, Baritone Uke",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=NMw-E7tz2hM",
    description:
      "This one's about Steve Jobs. I have a weird internal relationship with Mac's in general, and Steve in particular. I follow Mac stuff obsessively, reading blogs, watching keynotes, the whole nine. But at the same time, I feel ashamed of myself for buying into the uber-super-duper consumerism of it. I mean, it's consumerism ULTRA. Then, with Steve, it's this feeling that, based on everything that I've read of him, based on all of the speeches I've read of his (and I've read most, I think), it just seems to me that someone of his intelligence and sensitivity must also see the raw, unyielding consumerism that he's the King of, and I wonder, does he care? Does he ever question what he's throwing his obvious talent behind? I wonder. Anyway, he's sick and it's really sad imagining a world without Steve Jobs. I hope he gets better. I'd be so curious to know what his inner life is like.",
    acousticproduced: "Produced",
    firsts: "First Apple song.",
    mood: "Sad",
    spotify: "https://open.spotify.com/track/3NYJMlyBY9qfLybOVaohzh",
    itunes:
      "https://itunes.apple.com/ph/album/get-well-steve-jobs/1132700498?i=1132700653",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/im-drunk-because-the-economy-sucks",
    tags: "Folk,Nerd, Famous Person, Steve Jobs"
  },
  {
    number: 16,
    date: "2009-01-16T05:00:00.000Z",
    title: "Riding the Subway",
    length: "1:51",
    inkey: "D#m",
    tempo: 105,
    topic: "Poetic",
    location: "New York",
    instruments: "Vocals, Baritone Uke",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=ChcyufiBFOg",
    description: "Riding The Subway! Dig it.!",
    acousticproduced: "Produced",
    mood: "Intense",
    spotify: "https://open.spotify.com/track/1p6lNP6r3860StpYK3pIjU",
    itunes:
      "https://itunes.apple.com/ph/album/riding-the-subway/1132700498?i=1132700654",
    bandcamp: "https://jonathanmann.bandcamp.com/track/riding-the-subway",
    tags: "Folk, Dark, Travel,Subway"
  },
  {
    number: 17,
    date: "2009-01-17T05:00:00.000Z",
    title: "I'm So Tired of Capitalism",
    length: "2:06",
    inkey: "D#m",
    tempo: 112,
    topic: "Social Justice",
    location: "New York",
    instruments: "Vocals, Baritone Uke",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=2fVvJkn-S9s",
    description:
      "“I’m So Tired of Capitalism” Inspired by watching how the 24 news channels, and the commercials, etc, are packaging up Barack Obama and selling him. It’s what our culture is good at. Ugh.",
    acousticproduced: "Acoustic",
    mood: "Tired",
    spotify: "https://open.spotify.com/track/3WMIM9QKS0CHiZuENikAco",
    itunes:
      "https://itunes.apple.com/ph/album/im-so-tired-of-capitalism/1132700498?i=1132700655",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/im-so-tired-of-capitalism",
    tags: "Folk, Frustrated, Economy, Political, Capitalism"
  },
  {
    number: 18,
    date: "2009-01-18T05:00:00.000Z",
    title: "The Marks Sisters",
    length: "1:16",
    inkey: "F",
    tempo: 120,
    topic: "Friend",
    location: "Baltimore",
    instruments: "Vocals, Baritone Uke",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=betnMsatQYA",
    description:
      "I saw an old friend of mine yesterday, and she’s starting a 3 person acapella group with two other gals. They sang me a song. It was awesome. This song is about them, and if they like and/or could do anything with it, it’s theirs!",
    acousticproduced: "Acoustic",
    firsts: "First song in Baltimore.",
    comments: "Written for my friend's band.",
    mood: "Chill",
    spotify: "https://open.spotify.com/track/3RWwRBKooQVOMfZ0r0t04I",
    itunes:
      "https://itunes.apple.com/ph/album/the-marks-sisters/1132700498?i=1132700656",
    bandcamp: "https://jonathanmann.bandcamp.com/track/the-marks-sisters",
    tags: "Jazz, Rough, Personal"
  },
  {
    number: 19,
    date: "2009-01-19T05:00:00.000Z",
    title: "Snow Day",
    length: "2:15",
    inkey: "D",
    tempo: 140,
    topic: "Life",
    location: "Baltimore",
    instruments: "Vocals, Baritone Uke, Organ, Drums",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=rsZx9KBeVow",
    description:
      "Written with Thomas, age 11, and Michael, age 8. They did most of the lyrics, I helped with the music. That’s Thomas singing with me.",
    acousticproduced: "Produced",
    firsts: "First collaboration.",
    comments: "Written with an 8 and 11 year old.",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/2t0iZxtdxOiX6XOS90e2Zn",
    itunes:
      "https://itunes.apple.com/ph/album/snow-day/1132700498?i=1132700657",
    bandcamp: "https://jonathanmann.bandcamp.com/track/snow-day",
    tags: "Rock, Fun, Personal, Kids"
  },
  {
    number: 20,
    date: "2009-01-20T05:00:00.000Z",
    title: "Stars in Our Eyes",
    length: "2:31",
    inkey: "C",
    tempo: 131,
    topic: "Politics",
    location: "Baltimore",
    instruments: "Vocals, Organ",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=K_qfUkUFc4E",
    description:
      "I went to the inauguration today. I’m too tired to write something coherent. Here’s this instead!",
    acousticproduced: "Acoustic",
    mood: "Pensive",
    spotify: "https://open.spotify.com/track/7Kmh4pvlYfn3LNlSQW88iZ",
    itunes:
      "https://itunes.apple.com/ph/album/stars-in-our-eyes/1132700498?i=1132700658",
    bandcamp: "https://jonathanmann.bandcamp.com/track/stars-in-our-eyes",
    tags: "Latin, Fun, Political, Famous Person, Obama"
  },
  {
    number: 21,
    date: "2009-01-21T05:00:00.000Z",
    title: "Stay Out of My Body",
    length: "3:13",
    inkey: "Bbm",
    tempo: 88,
    topic: "Sick",
    location: "New York",
    instruments: "Vocals, Baritone Uke",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=Nf3bMujYhOU",
    description: "“Stay Out of My Body! A warning to colds and flus.",
    acousticproduced: "Acoustic",
    mood: "Tired",
    spotify: "https://open.spotify.com/track/3n3p64g3dm3jEWh0RzhNcb",
    itunes:
      "https://itunes.apple.com/ph/album/stay-out-of-my-body/1132700498?i=1132700659",
    bandcamp: "https://jonathanmann.bandcamp.com/track/stay-out-of-my-body",
    tags: "Folk, Dark, Personal"
  },
  {
    number: 22,
    date: "2009-01-22T05:00:00.000Z",
    title: "Obama Makes Me Smile",
    length: "0:59",
    inkey: "G",
    tempo: "n/a",
    topic: "Politics",
    location: "New York",
    instruments: "Vocals, Baritone Uke",
    beard: "N/A",
    videoid: "https://www.youtube.com/watch?v=pEg-XLfxURQ",
    description:
      "“Obama Makes Me Smile!” Written and performed by Sydney, age 8.",
    acousticproduced: "Produced",
    comments: "Written wtih a 9 year old. Footage from \nObama inauguration.",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/0apwQeXQPUalcbiEuzaPH0",
    itunes:
      "https://itunes.apple.com/ph/album/obama-makes-me-smile/1132700498?i=1132700660",
    bandcamp: "https://jonathanmann.bandcamp.com/track/obama-makes-me-smile",
    tags: "Folk, Light, Obama, Political, Kids"
  },
  {
    number: 23,
    date: "2009-01-23T05:00:00.000Z",
    title: "Barack Obama",
    length: "1:56",
    inkey: "A",
    tempo: 104,
    topic: "Politics",
    location: "New York",
    instruments: "Vocals, Electric Guitar",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=35rk9q3Z0N0",
    description:
      "Wow! 24! That’s a lot. 6 more to go? 7? “Barack Obama!” That’s what this one is called!",
    acousticproduced: "Produced",
    mood: "Happy",
    spotify: "https://open.spotify.com/track/5Ck2gu7GcOtOv4z0L2HAxC",
    itunes:
      "https://itunes.apple.com/ph/album/barack-obama/1132700498?i=1132700661",
    bandcamp: "https://jonathanmann.bandcamp.com/track/barack-obama",
    tags: "Rock, Distortion, Political, Famous Person, Obama"
  },
  {
    number: 24,
    date: "2009-01-24T05:00:00.000Z",
    title: "Hello, Hello",
    length: "1:00",
    inkey: "C",
    tempo: 120,
    topic: "Poetic",
    location: "Southington,CT",
    instruments: "Vocals, Synths, Samples, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=7zekFoBg12I",
    description:
      "I think yesterday was actually 23, and it was after midnight when I did the song. So this is 24, and that was 23.I got confused. Sorry!",
    acousticproduced: "Produced",
    firsts: "First song in Connecticut.",
    comments: "Made at my brother's house.",
    mood: "Happy",
    spotify: "https://open.spotify.com/track/31gl6BsZm0jxbQUlF2P1km",
    itunes:
      "https://itunes.apple.com/ph/album/hello-hello/1132700498?i=1132700662",
    bandcamp: "https://jonathanmann.bandcamp.com/track/hello-hello",
    tags: "Rock, Cheesy,Silly"
  },
  {
    number: 25,
    date: "2009-01-25T05:00:00.000Z",
    title: "Love Me a Little Bit More",
    length: "4:10",
    inkey: "Bm",
    tempo: 70,
    topic: "Love",
    location: "Jupiter, FL",
    instruments: "Vocals, Baritone Uke, Synths, \nDrum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=Mn1In11VTRs",
    description: "Yay! “Love Me A Little Bit More!” True story. Sort of.",
    acousticproduced: "Produced",
    firsts: "First song in Florida.",
    comments: "Made at my parent’s house.",
    mood: "Sad",
    spotify: "https://open.spotify.com/track/6UicUk99TrUdqWpB5Xzmky",
    itunes:
      "https://itunes.apple.com/ph/album/love-me-a-little-bit-more/1132700498?i=1132700663",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/love-me-a-little-bit-more",
    tags: "Blues, Dark, Personal, Relationships"
  },
  {
    number: 26,
    date: "2009-01-26T05:00:00.000Z",
    title: "Speaking Electricity",
    length: "3:45",
    inkey: "D",
    tempo: 86,
    topic: "Poetic",
    location: "Jupiter, FL",
    instruments: "Vocals, Baritone Uke, Synths, \nDrum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=uc-lNhjlOAA",
    description:
      '"Speaking Electricity!” About my lack of language skills. And other things too.',
    acousticproduced: "Produced",
    mood: "Pensive",
    spotify: "https://open.spotify.com/track/7AmoQ12Y0gOlJ3Fk4uGuJV",
    itunes:
      "https://itunes.apple.com/ph/album/speaking-electricity/1132700498?i=1132700664",
    bandcamp: "https://jonathanmann.bandcamp.com/track/speaking-electricity",
    tags: "Rock, Hopeful, "
  },
  {
    number: 27,
    date: "2009-01-27T05:00:00.000Z",
    title: "Up on the Mountain Top",
    length: "3:53",
    inkey: "D",
    tempo: 110,
    topic: "Poetic",
    location: "Jupiter, FL",
    instruments: "Vocals, Baritone Uke, Synths, \nDrum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=1lsfUAe8IGg",
    description:
      "“Up On The Mountaintop” Feeling a litte depressed about the state of the economy, etc. So many people losing their jobs. Almost unfathomable amounts. Ugh.",
    acousticproduced: "Produced",
    mood: "Pensive",
    spotify: "https://open.spotify.com/track/2j55GitKlpll3UNo6MLuIY",
    itunes:
      "https://itunes.apple.com/ph/album/up-on-the-mountain-top/1132700498?i=1132700665",
    bandcamp: "https://jonathanmann.bandcamp.com/track/up-on-the-mountain-top",
    tags: "Rock, Hopeful, "
  },
  {
    number: 28,
    date: "2009-01-28T05:00:00.000Z",
    title: "The Fox and the Hen",
    length: "1:41",
    inkey: "A",
    tempo: 114,
    topic: "Animals",
    location: "Jupiter, FL",
    instruments: "Vocals, Synths, \nDrum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=0Sfg1VGZggw",
    description:
      "A silly song about farm animals feelings sleepy. Have you ever read Animal Farm?",
    acousticproduced: "Produced",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/7qwcWzQXM9CGRSGLsVAOQ9",
    itunes:
      "https://itunes.apple.com/ph/album/the-fox-and-the-hen/1132700498?i=1132700666",
    bandcamp: "https://jonathanmann.bandcamp.com/track/the-fox-and-the-hen",
    tags: "Electro,Silly, Fox, Bird, Chicken"
  },
  {
    number: 29,
    date: "2009-01-29T05:00:00.000Z",
    title: "You Know Yourself",
    length: "2:35",
    inkey: "G",
    tempo: 100,
    topic: "Poetic",
    location: "Jupiter, FL",
    instruments: "Vocals, Baritone Uke, Synths, \nDrum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=5VScsEbZw7k",
    description:
      "Song #29 for song a day! We’re getting so close. “You Know Yourself”. Had fun writing and performing this one.",
    acousticproduced: "Produced",
    mood: "Intense",
    spotify: "https://open.spotify.com/track/1FFuJ2D4vBFqaaE1a2HGNu",
    itunes:
      "https://itunes.apple.com/ph/album/you-know-yourself/1132700498?i=1132700667",
    bandcamp: "https://jonathanmann.bandcamp.com/track/you-know-yourself",
    tags: "Electro, Heavy, Cheesy, "
  },
  {
    number: 30,
    date: "2009-01-30T05:00:00.000Z",
    title: "Dark Days",
    length: "2:12",
    inkey: "Bbm",
    tempo: 106,
    topic: "Animals",
    location: "Jupiter, FL",
    instruments: "Vocals, Baritone Uke, Synths, \nDrum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=rPAbyLll7xM",
    description: "Wow. Just…wow. I want to keep going… Can I?!",
    acousticproduced: "Produced",
    mood: "Anxious",
    spotify: "https://open.spotify.com/track/2Yz7XuljT7EhvtouFOLevL",
    itunes:
      "https://itunes.apple.com/ph/album/dark-days/1132700498?i=1132700668",
    bandcamp: "https://jonathanmann.bandcamp.com/track/dark-days",
    tags: "Rock, Dark, Looming,Meerkat"
  },
  {
    number: 31,
    date: "2009-01-31T05:00:00.000Z",
    title: "The Day That Google Crashed the internet",
    length: "3:15",
    inkey: "F",
    tempo: 107,
    topic: "Internet",
    location: "Jupiter, FL",
    instruments: "Vocals, Synths, Samples, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=3nH7RmupP8M",
    description:
      "Did anyone see google this morning? It was really weird. Every search returned results that said each website was malware.",
    acousticproduced: "Produced",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/2xGpBwXzssdigraVnB2NBb",
    itunes:
      "https://itunes.apple.com/ph/album/the-day-that-google-crashed-the-internet/1132700498?i=1132700669",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/the-day-that-google-crashed-the-internet",
    tags: "Rock,Nerd, Google"
  },
  {
    number: 32,
    date: "2009-02-01T05:00:00.000Z",
    title: "Go to Sleep",
    length: "3:58",
    inkey: "C",
    tempo: 98,
    topic: "Poetic ",
    location: "Jupiter, FL",
    instruments: "Vocals, Synths, Samples, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=W-ZnTEK_uos",
    description:
      "I'm going to keep going! Yay!! This one is about the fact that I've been dreaming a lot, and it feels like I'm more exhausted when I wake up then when I go to sleep.",
    acousticproduced: "Produced",
    mood: "Pensive",
    spotify: "https://open.spotify.com/track/4bNnXWhBaNkTXRMtNz2DPH",
    itunes:
      "https://itunes.apple.com/ph/album/go-to-sleep/1132700498?i=1132700670",
    bandcamp: "https://jonathanmann.bandcamp.com/track/go-to-sleep",
    tags: "Rock, Dark, 80s,Dreams"
  },
  {
    number: 33,
    date: "2009-02-02T05:00:00.000Z",
    title: "I Love Battlestar Galactica",
    length: "2:56",
    inkey: "G",
    tempo: 87,
    topic: "Nerd",
    location: "Jupiter, FL",
    instruments: "Vocals, Synths, Samples, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=xaStl18xyBc",
    description:
      "This goes out to all the Battlestar fans! “I Love Battlestar Galactica!” The show has gotten really, really good again. Thank god.",
    acousticproduced: "Produced",
    mood: "Happy",
    spotify: "https://open.spotify.com/track/4ls7kamxzLfn9LjsTN99hf",
    itunes:
      "https://itunes.apple.com/ph/album/i-love-battlestar-galactica/1132700498?i=1132700671",
    bandcamp: "https://jonathanmann.bandcamp.com/track/i-love-battlestar",
    tags: "Electro, Fun, Catchy,TV show, Sci-Fi, Battlestar"
  },
  {
    number: 34,
    date: "2009-02-03T05:00:00.000Z",
    title: "(Just Sing) a Happy Song",
    length: "1:53",
    inkey: "D",
    tempo: 94,
    topic: "Poetic ",
    location: "Jupiter, FL",
    instruments: "Vocals, Synths, Samples, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=uJ_zAYuFeAs",
    description:
      "“(Just Sing) A Happy Song” About how singing can cheer you up.",
    acousticproduced: "Produced",
    mood: "Happy",
    spotify: "https://open.spotify.com/track/2nxXHizn4ZeAtfBKnfkN7E",
    itunes:
      "https://itunes.apple.com/ph/album/just-sing-a-happy-song/1132700498?i=1132700672",
    bandcamp: "https://jonathanmann.bandcamp.com/track/just-sing-a-happy-song",
    tags: "Rock, Cheesy, "
  },
  {
    number: 35,
    date: "2009-02-04T05:00:00.000Z",
    title: "Come Down Where You Ought to Be",
    length: "2:29",
    inkey: "A",
    tempo: 74,
    topic: "Poetic ",
    location: "Los Angeles",
    instruments: "Vocals, Synths, Samples, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=ZikADYAT0y8",
    description: "For songfight.org",
    acousticproduced: "Produced",
    mood: "Pensive",
    spotify: "https://open.spotify.com/track/0DG05M3KlzCGAfBVcjcodJ",
    itunes:
      "https://itunes.apple.com/ph/album/come-down-where-you-ought-to-be/1132700498?i=1132700676",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/come-down-where-you-ought-to-be",
    tags: "Rock, Wistful, Narrative"
  },
  {
    number: 36,
    date: "2009-02-05T05:00:00.000Z",
    title: "Scarlett Thomas",
    length: "2:35",
    inkey: "C",
    tempo: 68,
    topic: "Book",
    location: "Los Angeles",
    instruments: "Vocals, Piano,Synths, Samples, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=-cU3FfI8k2s",
    description:
      'It\'s about Scarlett Thomas, an author. I\'ve read two of her books, and they\'re both amazing. "PopCo" and "The End of Mr. Y" Read them!',
    acousticproduced: "Produced",
    mood: "Chill",
    spotify: "https://open.spotify.com/track/5HfhTvu6ae7NwPojTlw6um",
    itunes:
      "https://itunes.apple.com/ph/album/scarlett-thomas/1132700498?i=1132700677",
    bandcamp: "https://jonathanmann.bandcamp.com/track/scarlett-thomas",
    tags: "Electro, Delicate,Nerd, Book, Famous Person, Scarlett Thomas"
  },
  {
    number: 37,
    date: "2009-02-06T05:00:00.000Z",
    title: "Water",
    length: "0:41",
    inkey: "F",
    tempo: 110,
    topic: "Nerd",
    location: "Los Angeles",
    instruments: "Vocals, Piano, Synths, Samples, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=txF8ZlqJ6SI",
    description:
      "A song about Water, and how you don't drink enough...drink more water, please!! Drink it a lot. Everyday.",
    acousticproduced: "Produced",
    mood: "Excited",
    spotify: "https://open.spotify.com/track/4p4ABkBcqgri3qTSJX6yLw",
    itunes: "https://itunes.apple.com/ph/album/water/1132700498?i=1132700678",
    bandcamp: "https://jonathanmann.bandcamp.com/track/water",
    tags: "Rock,Motivational, Food, Educational"
  },
  {
    number: 38,
    date: "2009-02-07T05:00:00.000Z",
    title: "Little Pink Boom Box",
    length: "0:43",
    inkey: "A",
    tempo: 108,
    topic: "Nerd",
    location: "Los Angeles",
    instruments: "Vocals, Piano, Synths, Samples, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=uQCKB77Q0sg",
    description:
      "About a little pink boombox that was laying around my girlfriend's room.",
    acousticproduced: "Produced",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/37a95RGpbFByMdfIKblcDn",
    itunes:
      "https://itunes.apple.com/ph/album/little-pink-boom-box/1132700498?i=1132700679",
    bandcamp: "https://jonathanmann.bandcamp.com/track/little-pink-boombox",
    tags: "Rock, Fun,Boom box"
  },
  {
    number: 39,
    date: "2009-02-08T05:00:00.000Z",
    title: "Changing the Color of My Walls",
    length: "0:50",
    inkey: "A?",
    tempo: 72,
    topic: "Life",
    location: "Berkeley",
    instruments: "Vocals, Acoustic Guitar",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=1go4XooMVu4",
    description:
      "Pretty self explanatory. Painting is fun, but I'm soooooo tired right now.",
    acousticproduced: "Produced",
    mood: "Tired",
    spotify: "https://open.spotify.com/track/3DaBm6k9xxJGTVocTtCMbg",
    itunes:
      "https://itunes.apple.com/ph/album/changing-the-color-of-my-walls/1132700498?i=1132700680",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/changing-the-color-of-my-walls",
    tags: "Jazz, Fun, Personal, Moving"
  },
  {
    number: 40,
    date: "2009-02-09T05:00:00.000Z",
    title: "The Ballad of Stimulus Jones",
    length: "1:02",
    inkey: "C",
    tempo: 112,
    topic: "Politics ",
    location: "Berkeley",
    instruments: "Vocals, Acoustic Guitar",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=0bA0ZAGpmfc",
    description: "N/A",
    acousticproduced: "Produced",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/2NWXpxQPQ9tLoReC4k51xV",
    itunes:
      "https://itunes.apple.com/ph/album/the-ballad-of-stimulus-jones/1132700498?i=1132700681",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/the-ballad-of-stimulus-jones",
    tags: "Folk, Political, Economy, capitalism"
  },
  {
    number: 41,
    date: "2009-02-10T05:00:00.000Z",
    title: "Wolf of the Battlefield",
    length: "1:59",
    inkey: "E",
    tempo: 92,
    topic: "Video Games",
    location: "Berkeley",
    instruments: "Vocals, Electric Guitar, Synths, Samples, Drum Machine",
    beard: "N/A",
    videoid: "https://www.youtube.com/watch?v=yoAZEsEvSoM",
    description:
      "Ask and ye shall receive...sometimes. A song about this week's VC release.",
    acousticproduced: "Produced",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/4sqbjeUOkynJlMw6ntty3x",
    itunes:
      "https://itunes.apple.com/ph/album/wolf-of-the-battlefield/1132700498?i=1132700682",
    bandcamp: "https://jonathanmann.bandcamp.com/track/wolf-of-the-battlefield",
    tags: "Rock,Nerd, NES"
  },
  {
    number: 42,
    date: "2009-02-11T05:00:00.000Z",
    title: 42,
    length: "0:46",
    inkey: "Am",
    tempo: 139,
    topic: "Song A Day",
    location: "Berkeley",
    instruments: "Vocals, Electric Guitar, Synths, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=hzH4198ShGU",
    description: "I say 42 forty two times.",
    acousticproduced: "Produced",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/5pfH4wtuTKTiS3KPItlZZu",
    itunes: "https://itunes.apple.com/ph/album/42/1132700498?i=1132700683",
    bandcamp: "https://jonathanmann.bandcamp.com/track/42",
    tags: "Rock, Distortion,Nerd "
  },
  {
    number: 43,
    date: "2009-02-12T05:00:00.000Z",
    title: "Sanae's Birthday Song",
    length: "0:56",
    inkey: "F",
    tempo: 97,
    topic: "Commission",
    location: "Berkeley",
    instruments: "Vocals, Electric Guitar, Synths, Samples, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=wHBVLYJ8N44",
    description: "A song for Sanae's birthday!!!",
    acousticproduced: "Produced",
    mood: "Happy",
    spotify: "https://open.spotify.com/track/2EkTU7LEzrDyPdUnODqQch",
    itunes:
      "https://itunes.apple.com/ph/album/sanaes-birthday-song/1132700498?i=1132700684",
    bandcamp: "https://jonathanmann.bandcamp.com/track/sanaes-birthday-song",
    tags: "Rock, Personal, Birthday"
  },
  {
    number: 44,
    date: "2009-02-13T05:00:00.000Z",
    title: "Rock and Roll Cats",
    length: "1:51",
    inkey: "Fm",
    tempo: 103,
    topic: "Nerd",
    location: "Berkeley",
    instruments: "Vocals, Electric Guitar, Synths, Samples, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=kfVH3veC7-s",
    description:
      "(#44 remix) Ross (Spectre of Woods) wrote a verse for this song because he couldn't help himself so we made a remix! Enjoy!",
    acousticproduced: "Produced",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/392rjCBI9JXf6Hsm9hQBrk",
    itunes:
      "https://itunes.apple.com/ph/album/rock-and-roll-cats/1132700498?i=1132700685",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/rock-and-roll-cats-feat-spectre-of-woods",
    tags: "Hip hop, Heavy,Silly, Cats, Collab, Ross Copeland"
  },
  {
    number: 45,
    date: "2009-02-14T05:00:00.000Z",
    title: "The Rain Returned",
    length: "2:12",
    inkey: "Bbm/Am/Bb?",
    tempo: 63,
    topic: "Poetic ",
    location: "Berkeley",
    instruments: "Vocals, Acoustic Guitar",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=ZPeqoThRlPg",
    description: "A very strange song indeed.",
    acousticproduced: "Produced",
    mood: "Pensive",
    spotify: "https://open.spotify.com/track/3r8jLcTFZMoEnEHk4nlays",
    itunes:
      "https://itunes.apple.com/ph/album/the-rain-returned/1132700498?i=1132700686",
    bandcamp: "https://jonathanmann.bandcamp.com/track/the-rain-returned",
    tags: "Folk,Narrative, Nerd, Multiple Universe "
  },
  {
    number: 46,
    date: "2009-02-15T05:00:00.000Z",
    title: "The Legend of Zelda: Overworld",
    length: "2:59",
    inkey: "Gm",
    tempo: 66,
    topic: "Video Games",
    location: "Berkeley",
    instruments: "Vocals, Acoustic Guitar, Electric Guitar, Bass, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=Xg7_pvCbp8g",
    description:
      "“The Legend of Zelda: Overworld” In which Link is forlorn at his lot in life, wishes for something more.",
    acousticproduced: "Produced",
    mood: "Pensive",
    spotify: "https://open.spotify.com/track/1sq6iACRUeSdGYL0uVjvPP",
    itunes:
      "https://itunes.apple.com/ph/album/the-legend-of-zelda-overworld/1132700498?i=1132700687",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/the-legend-of-zelda-overworld",
    tags: "Rock, Dark,Narrative, Nerd, NES, Zelda"
  },
  {
    number: 47,
    date: "2009-02-16T05:00:00.000Z",
    title: "Life Force",
    length: "1:40",
    inkey: "Gm",
    tempo: 82,
    topic: "Video Games",
    location: "Berkeley",
    instruments: "Vocals, Electric Guitar, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=FTtnC_PFBf8",
    description: "A great game! When in doubt, just SHOOT THE EYE!",
    acousticproduced: "Produced",
    mood: "Excited",
    spotify: "https://open.spotify.com/track/4zThr6E2JFuJ04mS4ZjJnL",
    itunes:
      "https://itunes.apple.com/ph/album/life-force/1132700498?i=1132700688",
    bandcamp: "https://jonathanmann.bandcamp.com/track/lifeforce",
    tags: "Electro, Dark,Nerd, NES, Life Force"
  },
  {
    number: 48,
    date: "2009-02-17T05:00:00.000Z",
    title: "Mummy's on Campus",
    length: "3:52",
    inkey: "Eb",
    tempo: 88,
    topic: "Commission",
    location: "Berkeley",
    instruments: "Vocals, Electric Guitar, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=QxIin3LKmKc",
    description:
      "A song request! from youtuber: unicornrida4life. He's made a 40 min. scary funny film called Mummy on Campus.",
    acousticproduced: "Produced",
    mood: "Pensive",
    spotify: "https://open.spotify.com/track/7uhftgmN8ocQJzFXDPMYFw",
    itunes:
      "https://itunes.apple.com/ph/album/mummys-on-campus/1132700498?i=1132700689",
    bandcamp: "https://jonathanmann.bandcamp.com/track/mummys-on-campus",
    tags: "Rock, Cheesy, 80s, "
  },
  {
    number: 49,
    date: "2009-02-18T05:00:00.000Z",
    title: "Get Up off of Your Ass (And Just Do Something)",
    length: "2:26",
    inkey: "D",
    tempo: 131,
    topic: "Politics",
    location: "Berkeley",
    instruments: "Vocals, Electric Guitar, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=GUTFXxi1TEw",
    description: "An anthem.",
    acousticproduced: "Produced",
    mood: "Excited",
    spotify: "https://open.spotify.com/track/47TsZVrWUWDwA25rQTe7w4",
    itunes:
      "https://itunes.apple.com/ph/album/get-up-off-of-your-ass-and-just-do-something/1132700498?i=1132700690",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/get-up-off-of-your-ass-and-just-do-something",
    tags: "Rock, Cheesy, 80s,Political, Motivational "
  },
  {
    number: 50,
    date: "2009-02-19T05:00:00.000Z",
    title: "One of the Lucky Ones",
    length: "2:32",
    inkey: "A",
    tempo: 76,
    topic: "Poetic ",
    location: "Oakland",
    instruments: "Vocals, Electric Guitar",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=W12UsLNacJE",
    description: "I'm over at Ross and Alex's house! Recording!",
    acousticproduced: "Produced",
    mood: "Pensive",
    spotify: "https://open.spotify.com/track/6wrVTZF8D1S9OIp736FvhD",
    itunes:
      "https://itunes.apple.com/ph/album/one-of-the-lucky-ones/1132700498?i=1132700691",
    bandcamp: "https://jonathanmann.bandcamp.com/track/one-of-the-lucky-ones",
    tags: "Rock, Wistful,Narrative"
  },
  {
    number: 51,
    date: "2009-02-20T05:00:00.000Z",
    title: "Your Mother Doesn't Love You Anymore (An Extrasolar Anthem)",
    length: "2:30",
    inkey: "D",
    tempo: 112,
    topic: "Nerd",
    location: "Berkeley",
    instruments: "Vocals, Electric Guitar, Synths, Samples, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=mr_Nb4zzsXQ",
    description:
      "About a planet somewhere in a far off galaxy that is tempting humanity to come join her. This was song request from Karol. He wanted a song about an extrasolar planet! Email me to make a request!",
    acousticproduced: "Produced",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/7IfbOCd48kdjsPZFPWY3El",
    itunes:
      "https://itunes.apple.com/ph/album/your-mother-doesnt-love-you-anymore-an-extrasolar-anthem/1132700498?i=1132700693",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/your-mother-doesnt-love-you-anymore-an-extrasolar-anthem",
    tags: "Rock, 80s, "
  },
  {
    number: 52,
    date: "2009-02-21T05:00:00.000Z",
    title: "Zombie Ponies",
    length: "0:54",
    inkey: "Bbm",
    tempo: 160,
    topic: "Animals",
    location: "Berkeley",
    instruments: "Vocals, Electric Guitar, Synths, Samples, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=qycQVQEWpqQ",
    description: "ZOMBIE PONIES!!! Requested by mancalledd.",
    acousticproduced: "Produced",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/7Ac5TCpGEa9yDZU8poOKM5",
    itunes:
      "https://itunes.apple.com/ph/album/zombie-ponies/1132700498?i=1132700694",
    bandcamp: "https://jonathanmann.bandcamp.com/track/zombie-ponies",
    tags: "Rock, Fun,Nerd, Zombie, Pony"
  },
  {
    number: 53,
    date: "2009-02-22T05:00:00.000Z",
    title: "Geriatrics in Drag",
    length: "1:00",
    inkey: "Am",
    tempo: 160,
    topic: "Commission",
    location: "Berkeley",
    instruments: "Vocals, Synths, Samples, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=rEI2bO4t_wU",
    description:
      "A song request from Jared. Them Geriatrics really know how to let loose!",
    acousticproduced: "Produced",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/2XQZduGWdwAreS56UY1a7Z",
    itunes:
      "https://itunes.apple.com/ph/album/geriatrics-in-drag/1132700498?i=1132700695",
    bandcamp: "https://jonathanmann.bandcamp.com/track/geriatrics-in-drag",
    tags: "Rock, 80s,Silly "
  },
  {
    number: 54,
    date: "2009-02-23T05:00:00.000Z",
    title: "Let's All Go to the Lobby (Fuck That!)",
    length: "2:30",
    inkey: "F",
    tempo: 150,
    topic: "Commission",
    location: "Berkeley",
    instruments: "Vocals, Electric Guitar, Synths, Samples, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=aTaQTcm2jqk",
    description:
      "A song request from Corbin AKA Multiplayas. He wanted a song about the \"Let's All Go To The Movies\" characters. I ended up writing a song about how pissed I get when I go to the movies these days, what with the 20 dollar tickets and the 20 dollar popcorn. It's all so over priced! No wonder",
    acousticproduced: "Produced",
    mood: "Angry",
    spotify: "https://open.spotify.com/track/7j9UWNSCiSx1tnBplisJtg",
    itunes:
      "https://itunes.apple.com/ph/album/lets-all-go-to-the-lobby/1132700498?i=1132700696",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/lets-all-go-to-the-lobby-fuck-that",
    tags: "Rock, Distortion,Angry, Nerd "
  },
  {
    number: 55,
    date: "2009-02-24T05:00:00.000Z",
    title: "BigFaceSmallFace",
    length: "1:11",
    inkey: "F#",
    tempo: 100,
    topic: "Kids",
    location: "Berkeley",
    instruments: "Vocals, Piano, Synths, Samples, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=_Xn-77ao7zA",
    description:
      "Big Face small face! For my niece, who has a small face, she's 3 months old!",
    acousticproduced: "Produced",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/5W3t2XJFiUfYY6GXzDhbuF",
    itunes:
      "https://itunes.apple.com/ph/album/bigfacesmallface/1132700498?i=1132700697",
    bandcamp: "https://jonathanmann.bandcamp.com/track/bigfacesmallface",
    tags: "Rock, Cheesy,Silly"
  },
  {
    number: 56,
    date: "2009-02-25T05:00:00.000Z",
    title: "Co-op Theme Song",
    length: "1:53",
    inkey: "D",
    tempo: 200,
    topic: "Video Games",
    location: "Berkeley",
    instruments: "Vocals, Electric Guitar, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=NoSjW9H7bZo",
    description: "#56 is just a DEMO.",
    acousticproduced: "Produced",
    mood: "Pensive",
    spotify: "https://open.spotify.com/track/37m0qsmtq1tcbHEmpUv8sS",
    itunes:
      "https://itunes.apple.com/ph/album/co-op-theme-song/1132700498?i=1132700698",
    bandcamp: "https://jonathanmann.bandcamp.com/track/co-op-theme",
    tags: "Rock,Motivational, Love, Nerd "
  },
  {
    number: 57,
    date: "2009-02-26T05:00:00.000Z",
    title: "All My Friends Are Dinosaurs",
    length: "4:40",
    inkey: "D/G?",
    tempo: 85,
    topic: "Instrumental",
    location: "Berkeley",
    instruments: "Samples, Electric Guitar, Drum Machine",
    beard: "N/A",
    videoid: "https://www.youtube.com/watch?v=VXju0WFRpyA",
    description:
      "Today's song is a collab with my new friend Jul. He's from Belgium. I shot and edited the video. That's him and Ross.",
    acousticproduced: "Produced",
    mood: "Pensive",
    spotify: "https://open.spotify.com/track/25rms747SdvKvFgDXsI9B0",
    itunes:
      "https://itunes.apple.com/ph/album/all-my-friends-are-dinosaurs/1132700498?i=1132700699",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/my-friends-and-i-are-dinosaurs",
    tags: "Ambient, Dreamy,  "
  },
  {
    number: 58,
    date: "2009-02-27T05:00:00.000Z",
    title: "Marilyn Langois",
    length: "1:10",
    inkey: "C",
    tempo: 120,
    topic: "Commission",
    location: "Berkeley",
    instruments: "Vocals, Synths, Samples, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=87LQ-ShXf6Q",
    description: "Another birthday song. For my friend Jessica's mom!",
    acousticproduced: "Produced",
    mood: "Happy",
    spotify: "https://open.spotify.com/track/7f5KcVsMB1M3lWaaqN4u6O",
    itunes:
      "https://itunes.apple.com/ph/album/marilyn-langois/1132700498?i=1132700700",
    bandcamp: "https://jonathanmann.bandcamp.com/track/marilyn-langois",
    tags: "Rock, Fun, Personal, Friend, Silly, Birthday "
  },
  {
    number: 59,
    date: "2009-02-28T05:00:00.000Z",
    title: "Shamus and Precious",
    length: "1:08",
    inkey: "Bm",
    tempo: 72,
    topic: "Life",
    location: "Oakland",
    instruments: "Vocals, Baritone Uke",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=LMFfytNSRDU",
    description:
      "“Shamus And Precious” I wrote this on the way home from the Fun A Day Art Show!! Yay! My friend Katie helped me film it and she helped with the subject matter and lyrics, too.",
    acousticproduced: "Acoustic",
    mood: "Sad",
    spotify: "https://open.spotify.com/track/0WMrCaIyBIHHdQ3HiCaXcx",
    itunes:
      "https://itunes.apple.com/ph/album/shamus-and-precious/1132700498?i=1132700701",
    bandcamp: "https://jonathanmann.bandcamp.com/track/shamus-and-precious",
    tags: "Folk, Dark, Rough, Personal, Narrative "
  },
  {
    number: 60,
    date: "2009-03-01T05:00:00.000Z",
    title: "2100 California St.",
    length: "1:16",
    inkey: "F",
    tempo: 97,
    topic: "Life",
    location: "Berkeley",
    instruments: "Vocals, Piano, Synths, Samples, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=FmxAGQ1ioyc",
    description:
      "A song request from Josh Godlington AKA REVERENDJOSHGODDERS. He wanted to see some of where I lived, so he wanted a song about my house! Here it is!",
    acousticproduced: "Produced",
    mood: "Happy",
    spotify: "https://open.spotify.com/track/2jhyUptrWWdeV6JnGQwwRC",
    itunes:
      "https://itunes.apple.com/ph/album/2100-california-st/1132700498?i=1132700702",
    bandcamp: "https://jonathanmann.bandcamp.com/track/our-house",
    tags: "Rock, Personal, Silly, Nerd"
  },
  {
    number: 61,
    date: "2009-03-02T05:00:00.000Z",
    title: "Knock Knock",
    length: "0:58",
    inkey: "Dm",
    tempo: 120,
    topic: "Poetic ",
    location: "Berkeley",
    instruments: "Vocals, Synths, Samples, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=m_A-rD7txSQ",
    description:
      "A song suggestion from youtuber Queenbeeandbabyduck! A song in the form of a knock knock joke!",
    acousticproduced: "Produced",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/7luio2iUnY28O9yjK3yYg1",
    itunes:
      "https://itunes.apple.com/ph/album/knock-knock/1132700498?i=1132700703",
    bandcamp: "https://jonathanmann.bandcamp.com/track/knock-knock",
    tags: "Rock, Dark,Silly"
  },
  {
    number: 62,
    date: "2009-03-03T05:00:00.000Z",
    title: "I'm the Same As I Ever Was",
    length: "0:39",
    inkey: "Bm",
    tempo: 115,
    topic: "Poetic ",
    location: "Berkeley",
    instruments: "Vocals, Synths, Samples, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=ZrR53d-OuQQ",
    description: "A very short song.",
    acousticproduced: "Produced",
    mood: "Pensive",
    spotify: "https://open.spotify.com/track/6nweAyUmOXEbA26wAgaaRR",
    itunes:
      "https://itunes.apple.com/ph/album/im-the-same-as-i-ever-was/1132700498?i=1132700704",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/im-the-same-as-i-ever-was",
    tags: "Electro, Dark, "
  },
  {
    number: 63,
    date: "2009-03-04T05:00:00.000Z",
    title: "Teddy Bear Revolution",
    length: "1:30",
    inkey: "C",
    tempo: 60,
    topic: "Kids",
    location: "Berkeley",
    instruments: "Vocals, Organ, Piano, Drum Machine",
    beard: "N/A",
    videoid: "https://www.youtube.com/watch?v=oFS4CSnL2uU",
    description: "A request from LEgend of Wiked on youtube.",
    acousticproduced: "Produced",
    mood: "Angry",
    spotify: "https://open.spotify.com/track/11cKeWCp0P7B5YrssruCwc",
    itunes:
      "https://itunes.apple.com/ph/album/teddy-bear-revolution/1132700498?i=1132700705",
    bandcamp: "https://jonathanmann.bandcamp.com/track/teddy-bear-revolution",
    tags: "Rock, Anthem,Silly, Nerd, Animals, Bear, Teddy Bear"
  },
  {
    number: 64,
    date: "2009-03-05T05:00:00.000Z",
    title: "The Spyders",
    length: "1:30",
    inkey: "Bb",
    tempo: 90,
    topic: "Commission",
    location: "Berkeley",
    instruments: "Vocals, Synths, Samples, Drum Machine",
    beard: "N/A",
    videoid: "https://www.youtube.com/watch?v=rmWP7D7BHoM",
    description:
      "Another one for Ivory’s mom. There’s a lot of inside jokes. It’s basically one big inside joke! Hope you like it anyway!",
    acousticproduced: "Produced",
    mood: "Happy",
    spotify: "https://open.spotify.com/track/7rjkwiPv7yxhnR0cl0KC2X",
    itunes:
      "https://itunes.apple.com/ph/album/the-spyders/1132700498?i=1132700706",
    bandcamp: "https://jonathanmann.bandcamp.com/track/the-spyders",
    tags: "Rock, Friend, Silly, Personal"
  },
  {
    number: 65,
    date: "2009-03-06T05:00:00.000Z",
    title: "Tetris: a History in Song",
    length: "3:41",
    inkey: "G#m",
    tempo: 130,
    topic: "Video Games",
    location: "Berkeley",
    instruments: "Vocals, Acoustic Guitar",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=34bYJDNS6Zo",
    description: "The History of Tetris! In song!!",
    acousticproduced: "Acoustic",
    mood: "Intense",
    spotify: "https://open.spotify.com/track/35ozJdC4qITVDtK33aNeUN",
    itunes:
      "https://itunes.apple.com/ph/album/teris-a-history-in-song/1132700498?i=1132700707",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/tetris-a-history-in-song",
    tags:
      "Folk,Funny, Nerd, History, Educational, NES, Tetris, Famous Person, Alexey Pajitnov"
  },
  {
    number: 66,
    date: "2009-03-07T05:00:00.000Z",
    title: "Night",
    length: "2:19",
    inkey: "E",
    tempo: 105,
    topic: "Poetic ",
    location: "Berkeley",
    instruments: "Vocals, Acoustic Guitar",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=BMobOOV0928",
    description:
      "It's 1:30 am and I'm really tired and I wrote this song. NIGHT",
    acousticproduced: "Produced",
    mood: "Pensive",
    spotify: "https://open.spotify.com/track/4iT4gczTkKytl5a4ouHNeR",
    itunes: "https://itunes.apple.com/ph/album/night/1132700498?i=1132700708",
    bandcamp: "https://jonathanmann.bandcamp.com/track/night",
    tags: "Folk,Delicate"
  },
  {
    number: 67,
    date: "2009-03-08T05:00:00.000Z",
    title: "Zombie Rights, Zombie Dance",
    length: "1:25",
    inkey: "C",
    tempo: 110,
    topic: "Nerd",
    location: "Berkeley",
    instruments: "Vocals, Synths, Samples, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=40rCqT_v3hU",
    description:
      "Another request! About Zombie rights. But, you know, it turned into zombie dance. What can you do?",
    acousticproduced: "Produced",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/5ousCKL79PAy4SSaqtQbFO",
    itunes:
      "https://itunes.apple.com/ph/album/zombie-rights-zombie-dance/1132700498?i=1132700709",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/zombie-rights-zombie-dance",
    tags: "Rock,Funny, Nerd, Zombie"
  },
  {
    number: 68,
    date: "2009-03-09T04:00:00.000Z",
    title: "A Ringtone for Ivory King",
    length: "0:30",
    inkey: "C",
    tempo: 170,
    topic: "Ringtone",
    location: "Berkeley",
    instruments: "Vocals, Synths, Samples, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=zszgC2VeVBA",
    description:
      "(haha) A Ringtone For Ivory. I’ve decided that I’m going to offer custom ringtones at $10 a pop. See the sidebar if you’re interested!",
    acousticproduced: "Produced",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/5UMdRY5J4Vr6r9ejgcYnCc",
    itunes:
      "https://itunes.apple.com/ph/album/for-ivory-king/1132700498?i=1132700710",
    bandcamp: "https://jonathanmann.bandcamp.com/track/a-ringtone-for-ivory",
    tags: "Rock, Personal, Ringtone"
  },
  {
    number: 69,
    date: "2009-03-10T04:00:00.000Z",
    title: "Oh, It's Probably Time",
    length: "0:48",
    inkey: "G",
    tempo: 80,
    topic: "Contest",
    location: "Berkeley",
    instruments: "Vocals, Piano, Samples, Drum Machine",
    beard: "N/A",
    videoid: "https://www.youtube.com/watch?v=VVoVAyXEJ68",
    description:
      "(?) An ad for careerbuilder.com. If we win, it's $5000. Vote for us if we make it to the final round.",
    acousticproduced: "Produced",
    mood: "Chill",
    spotify: "https://open.spotify.com/track/6KVrzKOz7bCfvhEhOgRG0c",
    itunes:
      "https://itunes.apple.com/ph/album/oh-its-probably-time/1132700498?i=1132700711",
    bandcamp: "https://jonathanmann.bandcamp.com/track/oh-its-probably-time",
    tags: "Rock, Anthem, Wistful"
  },
  {
    number: 70,
    date: "2009-03-11T04:00:00.000Z",
    title: "Can We Kick It With Kikkoman (Of Course We Can!)",
    length: "1:01",
    inkey: "C",
    tempo: 120,
    topic: "Contest",
    location: "Berkeley",
    instruments: "Vocals, Piano, Samples, Drum Machine",
    beard: "N/A",
    videoid: "https://www.youtube.com/watch?v=60-83hmpjDw",
    description: "For a Kikkoman video contest!",
    acousticproduced: "Produced",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/33bbIF0znZSsTNxU5sYYbV",
    itunes:
      "https://itunes.apple.com/ph/album/can-we-kick-it-kikkoman-of-course-we-can/1132700498?i=1132700712",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/can-we-kick-it-with-kikkoman-of-course-we-can",
    tags: "Rock, Fun, Bear, Company, Teddy Bear, Kikkoman"
  },
  {
    number: 71,
    date: "2009-03-12T04:00:00.000Z",
    title: "And They Call It Natural",
    length: "1:59",
    inkey: "C",
    tempo: 60,
    topic: "Commission",
    location: "Berkeley",
    instruments: "Vocals, Electric Guitar, Synths, Samples, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=c23PUpoZ9hE",
    description: 'A song request from youtube user xkeals "Sam" from Australia',
    acousticproduced: "Produced",
    mood: "Sad",
    spotify: "https://open.spotify.com/track/39nhPIWI6tO2rZ3rbE1Hno",
    itunes:
      "https://itunes.apple.com/ph/album/and-they-call-it-natural/1132700498?i=1132700713",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/and-they-call-it-natural",
    tags: "Rock, Wistful,  "
  },
  {
    number: 72,
    date: "2009-03-13T04:00:00.000Z",
    title: "Penguins Having a Party (2009)",
    length: "1:44",
    inkey: "C",
    tempo: 106,
    topic: "Animals",
    location: "Berkeley",
    instruments: "Vocals, Synths, Samples, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=QGTEGVtoXyA",
    description:
      "A request from youtuber ZombieSlapper! Keep the requests coming!",
    acousticproduced: "Produced",
    mood: "Happy",
    spotify: "https://open.spotify.com/track/6RC5YTY9mfoJXN0R2pjgRu",
    itunes:
      "https://itunes.apple.com/ph/album/penguins-having-a-party/1132700498?i=1132700714",
    bandcamp: "https://jonathanmann.bandcamp.com/track/penguins-having-a-party",
    tags: "Rock, Anthem,Silly, Nerd, Penguins"
  },
  {
    number: 73,
    date: "2009-03-14T04:00:00.000Z",
    title: "Nano Nano Nightmare",
    length: "1:47",
    inkey: "C",
    tempo: 105,
    topic: "Contest",
    location: "Berkeley",
    instruments: "Vocals, Synths, Drum Machine",
    beard: "N/A",
    videoid: "https://www.youtube.com/watch?v=Pwf3dZSwjuk",
    description: "Nanotechnologicnightmare.",
    acousticproduced: "Produced",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/6CU7KYCHdqUNfWBoVUlloG",
    itunes:
      "https://itunes.apple.com/ph/album/nano-nano-nightmare/1132700498?i=1132700715",
    bandcamp: "https://jonathanmann.bandcamp.com/track/nano-nano-nightmare",
    tags: "Rock,Contest, Narrative, Silly, Robots"
  },
  {
    number: 74,
    date: "2009-03-15T04:00:00.000Z",
    title: "The Number Nine",
    length: "1:34",
    inkey: "Bb",
    tempo: 140,
    topic: "Kids",
    location: "Berkeley",
    instruments: "Vocals, Synths, Drum Machine",
    beard: "N/A",
    videoid: "https://www.youtube.com/watch?v=p2Cvn2hULws",
    description:
      "A song for Sophia! She's working on adding. She's up to 9. Hope this helps!",
    acousticproduced: "Produced",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/14L8xsxQxaybZ895YL4kwD",
    itunes:
      "https://itunes.apple.com/ph/album/the-number-nine/1132700498?i=1132700716",
    bandcamp: "https://jonathanmann.bandcamp.com/track/the-number-nine",
    tags: "Electro,Fun, Nerd, Educational "
  },
  {
    number: 75,
    date: "2009-03-16T04:00:00.000Z",
    title: "Don't Give Up, Chrissy",
    length: "1:30",
    inkey: "C",
    tempo: 80,
    topic: "Commission",
    location: "Berkeley",
    instruments: "Vocals, Synths, Samples, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=HfVFsU-aQ90",
    description:
      "#76 is a song request from Sonmanic, AKA Richard. It's for his sister, who is having a very rough time.",
    acousticproduced: "Produced",
    mood: "Sad",
    spotify: "https://open.spotify.com/track/3jB8WelREyO0kKQo5OM0fE",
    itunes:
      "https://itunes.apple.com/ph/album/dont-give-up-chrissy/1132700498?i=1132700717",
    bandcamp: "https://jonathanmann.bandcamp.com/track/dont-give-up-chrissy",
    tags: "Rock, Motivational, Wistful"
  },
  {
    number: 76,
    date: "2009-03-17T04:00:00.000Z",
    title: "Hey, Paul Krugman",
    length: "1:41",
    inkey: "F",
    tempo: 80,
    topic: "Politics",
    location: "Berkeley",
    instruments: "Vocals, Electric Guitar, Synths, Samples, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=XOYAuk809fY",
    description:
      "About the famous economist, Nobel prize winner and all around cool guy. Featuring my friend Madelyn, who is in an awesome band called The Muffin Brigade",
    acousticproduced: "Produced",
    mood: "Angry",
    spotify: "https://open.spotify.com/track/6P70lLCvurjTIsz0S3WttR",
    itunes:
      "https://itunes.apple.com/ph/album/hey-paul-krugman/1132700498?i=1132700718",
    bandcamp: "https://jonathanmann.bandcamp.com/track/hey-paul-krugman",
    tags:
      "Rock, Heavy, Political, Economy, Viral, Famous Person, Economist, Paul Krugman"
  },
  {
    number: 77,
    date: "2009-03-18T04:00:00.000Z",
    title: "Copying isn't Theft",
    length: "1:09",
    inkey: "G#",
    tempo: 160,
    topic: "Nerd",
    location: "Berkeley",
    instruments: "Vocals, Electric Guitar, Samples, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=zMP3QOlWV64",
    description:
      "Wasn't written by me! It was written by Nina Paley, an amazing animator. She wrote the lyrics and melody, (here's the original video of her singing it: ) When I heard it, I just knew I had to \"copy\" it! Yay!",
    acousticproduced: "Produced",
    mood: "Happy",
    spotify: "https://open.spotify.com/track/01eeQJI1Z0wHyoPY8gqkrR",
    itunes:
      "https://itunes.apple.com/ph/album/copying-isnt-theft/1132700498?i=1132700719",
    bandcamp: "https://jonathanmann.bandcamp.com/track/copying-isnt-theft",
    tags: "Rock, Fun, Political, Internet"
  },
  {
    number: 78,
    date: "2009-03-19T04:00:00.000Z",
    title: "Saving Newspapers",
    length: "2:41",
    inkey: "Am",
    tempo: 145,
    topic: "Nerd",
    location: "Berkeley",
    instruments: "Vocals, Electric Guitar, Synths, Samples, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=52VdW8qFJ6Q",
    description:
      "This is a redux of #79. The music is the same, but I enlisted the lip-dub and acting chops of my friends down at the East Bay Express, the local alt-weekly here in the East Bay. Yay!",
    acousticproduced: "Produced",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/6L6SrW8UQWIvoQO1JWhW1C",
    itunes:
      "https://itunes.apple.com/ph/album/saving-newspapers/1132700498?i=1132700720",
    bandcamp: "https://jonathanmann.bandcamp.com/track/saving-newspapers",
    tags: "Rock, Fun, Political, Internet"
  },
  {
    number: 79,
    date: "2009-03-20T04:00:00.000Z",
    title: "Spring Equinox",
    length: "1:10",
    inkey: "G",
    tempo: 90,
    topic: "Instrumental",
    location: "Berkeley",
    instruments: "Synths, Samples, Drum Machine",
    beard: "N/A",
    videoid: "https://www.youtube.com/watch?v=9TJ6kXDHtsU",
    description:
      "Yes. I am green and naked and prancing through eh fairy forest. Wanna make something of it?",
    acousticproduced: "Produced",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/00JQjLBYSjLhcpH7idheO5",
    itunes:
      "https://itunes.apple.com/ph/album/spring-equinox/1132700498?i=1132700721",
    bandcamp: "https://jonathanmann.bandcamp.com/track/spring-equinox",
    tags: "Ambient, Dreamy,Weather, Spring "
  },
  {
    number: 80,
    date: "2009-03-21T04:00:00.000Z",
    title: "Out My Front Door",
    length: "1:42",
    inkey: "C",
    tempo: 90,
    topic: "Life",
    location: "Berkeley",
    instruments: "Vocals, Piano, Samples, Drum Machine",
    beard: "N/A",
    videoid: "https://www.youtube.com/watch?v=Zov56wnlYUw",
    description:
      "Images seen while looking out from my front door set to music and lyrics.",
    acousticproduced: "Produced",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/1DnriOtkZxHzgzPLscHzvj",
    itunes:
      "https://itunes.apple.com/ph/album/out-my-front-door/1132700498?i=1132700722",
    bandcamp: "https://jonathanmann.bandcamp.com/track/out-my-front-door",
    tags: "Rock, Wistful,Funny"
  },
  {
    number: 81,
    date: "2009-03-22T04:00:00.000Z",
    title: "Come On, Nouriel",
    length: "1:26",
    inkey: "C#",
    tempo: 120,
    topic: "Politics ",
    location: "Berkeley",
    instruments: "Vocals, Piano, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=vMapa6591M4",
    description:
      'A sort of follow up to "Hey Paul Krugman", which has apparently gone viral.',
    acousticproduced: "Produced",
    mood: "Happy",
    spotify: "https://open.spotify.com/track/48S7yUvS2iqxmm6TE0ejvF",
    itunes:
      "https://itunes.apple.com/ph/album/come-on-nouriel/1132700498?i=1132700723",
    bandcamp: "https://jonathanmann.bandcamp.com/track/come-on-nouriel",
    tags: "Rock, Political, Economy, Famous Person, Economist, Nouriel Roubini"
  },
  {
    number: 82,
    date: "2009-03-23T04:00:00.000Z",
    title: "A Long Time Coming (EFCA)",
    length: "1:59",
    inkey: "Bb",
    tempo: 155,
    topic: "Social Justice",
    location: "Berkeley",
    instruments: "Vocals, Acoustic Guitar, Electric Guitar, Bass, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=F36rY4VMRPE",
    description:
      "is a song request from Jonah Lalas. He and his wife were union organizers for 5 years. This song is about The Employee Free Choice Act, which would make it much easier for workers to unionize. Which is a VERY good thing. Workers Unite!",
    acousticproduced: "Produced",
    mood: "Happy",
    spotify: "https://open.spotify.com/track/3T7EMdR9TN3RofaYsC2irM",
    itunes:
      "https://itunes.apple.com/ph/album/a-long-time-coming-efca/1132700498?i=1132700724",
    bandcamp: "https://jonathanmann.bandcamp.com/track/a-long-time-coming-efca",
    tags: "Folk,Motivational, Wistful, Political, SJW"
  },
  {
    number: 83,
    date: "2009-03-24T04:00:00.000Z",
    title: "My Obama Neurosis",
    length: "1:49",
    inkey: "C",
    tempo: 130,
    topic: "Politics",
    location: "Berkeley",
    instruments: "Vocals, Synths, Samples, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=BeTV3eIkzp0",
    description:
      "It's about my strange Obama Neurosis. I love him; I'm confused by his choices. He's great; he makes no sense! This back and forth forces me into this Jekyll and Hyde mindset. Yes! No! Argh!",
    acousticproduced: "Produced",
    mood: "Confused",
    spotify: "https://open.spotify.com/track/2j3BKJ4BRWMYP7V0UqMuVL",
    itunes:
      "https://itunes.apple.com/ph/album/my-obama-neurosis/1132700498?i=1132700725",
    bandcamp: "https://jonathanmann.bandcamp.com/track/my-obama-nuerosis",
    tags: "Electro, Funny, Political, Famous Person, Obama"
  },
  {
    number: 84,
    date: "2009-03-25T04:00:00.000Z",
    title: "1600 Pennsylvania Ave.",
    length: "1:26",
    inkey: "E",
    tempo: 150,
    topic: "TV",
    location: "Berkeley",
    instruments: "Vocals, Electric Guitar, Synths, Samples, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=Zm_XoG1BqSY",
    description:
      "is a request from David Shuster, who has a show on MSNBC. He wanted a song about his show! So here it is! Wahoo!!",
    acousticproduced: "Produced",
    mood: "Happy",
    spotify: "https://open.spotify.com/track/3XsUeJ5xJRiirobqJ6OSNX",
    itunes:
      "https://itunes.apple.com/ph/album/1600-pennsylvania-ave/1132700498?i=1132700726",
    bandcamp: "https://jonathanmann.bandcamp.com/track/1600-pennsylvania-ave",
    tags: "Rock,Political, TV Show, Famous Person, David Shuster"
  },
  {
    number: 85,
    date: "2009-03-26T04:00:00.000Z",
    title: "Fun a Day Anthem",
    length: "2:30",
    inkey: "D",
    tempo: 138,
    topic: "Song A Day",
    location: "Berkeley",
    instruments: "Vocals, Electric Guitar, Shaker",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=TJ9Z4DgFJ0w",
    description:
      "Thanks to David Shuster for having me on his show!! Welcome to the new viewers! This is a REDUX, something I haven't done for any songs yet, but seemed appropriate here. This song is about following that which you LOVE to do. Since this whole viral Krugman thing only happened because I do what I love to do everyday, I want to spread the message of following your bliss, wherever it leads you. Hopefully this message will especially resonate with those that are out of work, down on their luck, feelin' blue and looking for hope. Find what you love to do and do it.",
    acousticproduced: "Produced",
    mood: "Happy",
    spotify: "https://open.spotify.com/track/5KmgeV7qvVH7FjjShFK7ah",
    itunes:
      "https://itunes.apple.com/ph/album/fun-a-day-anthem/1132700498?i=1132700727",
    bandcamp: "https://jonathanmann.bandcamp.com/track/fun-a-day-anthem",
    tags: "Folk, Personal, Motivational, Redux"
  },
  {
    number: 86,
    date: "2009-03-27T04:00:00.000Z",
    title: "You're Doing It Right, Jon Stewart",
    length: "1:40",
    inkey: "G",
    tempo: 80,
    topic: "TV",
    location: "Berkeley",
    instruments: "Vocals, Synths, Samples, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=QtL5hvWKcvk",
    description:
      "(note: this is just because the first versions is giving an error message n SD)#87 has been a long time coming. I've been meaning to write this song for many years. Jon Stewart is amazing. Seeing him on Crossfire in 2004 (which I was lucky enough to catch live), was one of the most amazing pieces of television I have ever seen, period. Yes.",
    acousticproduced: "Produced",
    mood: "Happy",
    spotify: "https://open.spotify.com/track/4S4suSR4mSWbrwFERnupuc",
    itunes:
      "https://itunes.apple.com/ph/album/youre-doing-it-right-jon-stewart/1132700498?i=1132700728",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/youre-doing-it-right-jon-stewart",
    tags: "Rock,Political, TV Show, Famous Person, Jon Stewart"
  },
  {
    number: 87,
    date: "2009-03-28T04:00:00.000Z",
    title: "I am Just a Little Post-It Note",
    length: "1:18",
    inkey: "Bm",
    tempo: 80,
    topic: "Nerd",
    location: "Berkeley",
    instruments: "Vocals, Piano, Electric Guitar, Drum Machine",
    beard: "N/A",
    videoid: "https://www.youtube.com/watch?v=dw2ZL2eFDfU",
    description:
      "#88 is a request by Darkporpoise. He wanted a song about the secret lives of Post-it notes. So here it is! Why is the post it note stuck to a building in NYC? Why, indeed!",
    acousticproduced: "Produced",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/0tQzHhCqmvJIZszlUXMYrx",
    itunes:
      "https://itunes.apple.com/ph/album/i-am-just-a-little-post-it-note/1132700498?i=1132700729",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/i-am-just-a-little-post-it-note",
    tags: "Rock,Silly, Nerd"
  },
  {
    number: 88,
    date: "2009-03-29T04:00:00.000Z",
    title: "Soren's Song",
    length: "2:09",
    inkey: "F",
    tempo: 80,
    topic: "Commission",
    location: "Berkeley",
    instruments: "Vocals, Acoustic Guitar, Samples, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=2yo3LbC4KbI",
    description:
      "#89 is a request from Joel Eckel and his son, Soren, who is 8 years old. Soren is following the song a day project closely, as it's become part of his daily home schooling curriculum. This is a song for him!",
    acousticproduced: "Produced",
    mood: "Happy",
    spotify: "https://open.spotify.com/track/5yH1O9dHGnUC4mC7SWGnuA",
    itunes:
      "https://itunes.apple.com/ph/album/sorens-song/1132700498?i=1132700730",
    bandcamp: "https://jonathanmann.bandcamp.com/track/sorens-song",
    tags: "Folk, Person, Wistful, Political, Kids"
  },
  {
    number: 89,
    date: "2009-03-30T04:00:00.000Z",
    title: "Jerry Springer",
    length: "1:43",
    inkey: "F",
    tempo: 100,
    topic: "Contest",
    location: "Berkeley",
    instruments: "Vocals, Uke,  Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=PG2WBfwooAk",
    description:
      "WARNING! NOT SUITABLE FOR KIDS!!! #90 is a song for a Jerry Springer song contest. The prize is $5000. Sweet. They're going to choose 10 finalists, then there will be voting by the public. The top 3 will come on the show and perform, and then a winner will be announced. 2 things about Jerry Springer that make me think there's more to the man than he gets credit for. 1. He was the mayor of Cincinnati. Then he slept with a prostitute. But he was HONEST about it, and was able to get elected a second time. 2. He was just a little baby when his parents bundled him up, and left their home in Germany to escape the Nazis.. His entire family tree was decimated. I think this colors the man.",
    acousticproduced: "Produced",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/4tYGHtfaF2TMQgIFs7BUxW",
    itunes:
      "https://itunes.apple.com/ph/album/jerry-springer/1132700498?i=1132700731",
    bandcamp: "https://jonathanmann.bandcamp.com/track/jerry-springer",
    tags: "Rock, Nerd, TV Show, Famous Person, Jerry Springer"
  },
  {
    number: 90,
    date: "2009-03-31T04:00:00.000Z",
    title: "The Close",
    length: "0:57",
    inkey: "D",
    tempo: 100,
    topic: "TV",
    location: "Berkeley",
    instruments: "Vocals, Synths, Samples, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=OI-m2H_8q_c",
    description:
      "#91 is a song written for a Canadian financial news program called \"The Close\". It's on this channel called BNN, which is the equivalent of CNBC. I think they're having me on on friday.",
    acousticproduced: "Produced",
    mood: "Happy",
    spotify: "https://open.spotify.com/track/66yvqURs312Q1hPdYXgN2f",
    itunes:
      "https://itunes.apple.com/ph/album/the-close/1132700498?i=1132700732",
    bandcamp: "https://jonathanmann.bandcamp.com/track/the-close",
    tags: "Rock,Political, TV Show"
  },
  {
    number: 91,
    date: "2009-04-01T04:00:00.000Z",
    title: "Ringtone for Mike Trash",
    length: "0:42",
    inkey: "C",
    tempo: 240,
    topic: "Ringtone",
    location: "Berkeley",
    instruments: "Vocals, Bass, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=xJMK1M9ICsg",
    description:
      "You know, I've been inundated with ringtone requests. But this one is for Mike Trash, who is a co-worker of Casey Dolan, who is a radio personality on 93.7 KCLB FM in Palm Springs. He's going to interview me tomorrow so I whipped this up for him!",
    acousticproduced: "Produced",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/3neyMThbgoz0pOgCEll26X",
    itunes:
      "https://itunes.apple.com/ph/album/mike-trash/1133048770?i=1133048914",
    bandcamp: "https://jonathanmann.bandcamp.com/track/ringtone-for-mike-trash",
    tags: "Punk, Fun, Person, Silly "
  },
  {
    number: 92,
    date: "2009-04-02T04:00:00.000Z",
    title: "Ivory is in the Caribbean (And I Miss Her)",
    length: "1:33",
    inkey: "F",
    tempo: 60,
    topic: "Life",
    location: "Berkeley",
    instruments: "Vocals, Electric Guitar, Samples",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=e8RAqe0Qkf4",
    description:
      "the title says it all! I'm going to be joining her on the 8th. More on that later.",
    acousticproduced: "Produced",
    mood: "Pensive",
    spotify: "https://open.spotify.com/track/0GPoPV2yXQARUlTufamu8N",
    itunes:
      "https://itunes.apple.com/ph/album/ivory-is-in-the-caribbean-and-i-miss-her/1133048770?i=1133048915",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/ivory-is-in-the-caribbean-and-i-miss-her",
    tags: "Folk, Personal, Relationships, Love"
  },
  {
    number: 93,
    date: "2009-04-03T04:00:00.000Z",
    title: "Tumblr",
    length: "1:41",
    inkey: "B",
    tempo: 48,
    topic: "Internet",
    location: "Berkeley",
    instruments: "Vocals, Banjo, Shaker",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=wiUuuL87OH4",
    description:
      "For the fine folks at Tumblr. They make a great service. This was commissioned, by the way.",
    acousticproduced: "Produced",
    mood: "Pensive",
    spotify: "https://open.spotify.com/track/31V6G6oflGqQPQHPsbZbA6",
    itunes: "https://itunes.apple.com/ph/album/tumblr/1133048770?i=1133048916",
    bandcamp: "https://jonathanmann.bandcamp.com/track/tumblr",
    tags: "Folk, Dark,Silly, Company, Nerd"
  },
  {
    number: 94,
    date: "2009-04-04T04:00:00.000Z",
    title: "The Ten Plagues",
    length: "2:10",
    inkey: "D",
    tempo: 100,
    topic: "Nerd",
    location: "Berkeley",
    instruments: "Vocals, Piano, Electric Guitar, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=x7Jv5hcE5jM",
    description:
      "It's a Passover song! I realize that Passover doesn't start until the 9th, which also happens to be my birthday (and the day of my 100th song), but I wanted to get this out there ahead of time. Enjoy!",
    acousticproduced: "Produced",
    mood: "Intense",
    spotify: "https://open.spotify.com/track/0RQDasLRxIQl30aphODDCL",
    itunes:
      "https://itunes.apple.com/ph/album/the-ten-plagues/1133048770?i=1133048917",
    bandcamp: "https://jonathanmann.bandcamp.com/track/the-ten-plagues",
    tags: "Rock, Myth, God, Heavy,Funny, Nerd, History, Educational"
  },
  {
    number: 95,
    date: "2009-04-05T04:00:00.000Z",
    title: "Pieces",
    length: "2:15",
    inkey: "B",
    tempo: 136,
    topic: "Poetic ",
    location: "Berkeley",
    instruments: "Vocals, Acoustic Guitar, Banjo, Shaker",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=MJmH-0J5Wpk",
    description: "Plumbing the depths of my soul.",
    acousticproduced: "Produced",
    mood: "Pensive",
    spotify: "https://open.spotify.com/track/4ua0ukq0GmmXHbPVjxSaVr",
    itunes: "https://itunes.apple.com/ph/album/pieces/1133048770?i=1133048918",
    bandcamp: "https://jonathanmann.bandcamp.com/track/pieces",
    tags: "Folk, Personal, Wistful"
  },
  {
    number: 96,
    date: "2009-04-06T04:00:00.000Z",
    title: "My Baritone Uke and I",
    length: "0:56",
    inkey: "C#",
    tempo: 118,
    topic: "Song A Day",
    location: "Berkeley",
    instruments: "Vocals, Baritone Uke",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=KjtpzSMuusw",
    description:
      "I wrote it on a plane. I'm in Florida visiting my folks on the way down to see Ivory in the Caribbean. I've been up since 4am! I'm pretty tired. This one just kind of plopped out. :-)",
    acousticproduced: "Produced",
    mood: "Happy",
    spotify: "https://open.spotify.com/track/2JX1QaGLPoKWvQBcyOqJVL",
    itunes:
      "https://itunes.apple.com/ph/album/my-baritone-uke-and-i/1133048770?i=1133048919",
    bandcamp: "https://jonathanmann.bandcamp.com/track/my-baritone-uke-and-i",
    tags: "Folk, Personal, Wistful, Nerd "
  },
  {
    number: 97,
    date: "2009-04-07T04:00:00.000Z",
    title: "1 Week, 5 Days",
    length: "2:01",
    inkey: "C#",
    tempo: 85,
    topic: "Life",
    location: "Berkeley",
    instruments: "Vocals, Baritone Uke",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=l2GNCegRzFU",
    description: "I'm going to see Ivory tomorrow. I am excited.",
    acousticproduced: "Produced",
    mood: "Sad",
    spotify: "https://open.spotify.com/track/1N0Q77YizmUxtpFEQX1lCq",
    itunes:
      "https://itunes.apple.com/ph/album/1-week-5-days/1133048770?i=1133048920",
    bandcamp: "https://jonathanmann.bandcamp.com/track/1-week-5-days-2",
    tags: "Folk, Personal, Wistful, Relationships"
  },
  {
    number: 98,
    date: "2009-04-08T04:00:00.000Z",
    title: "Ringtone for Shelly",
    length: "0:42",
    inkey: "D",
    tempo: 120,
    topic: "Ringtone",
    location: "Berkeley",
    instruments: "Vocals, Piano, Samples, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=CMYuGzBgX4o",
    description:
      "This one is for Shelly, who is a co-worker of Casey Dolan, who is a radio personality on 93.7 KCLB FM in Palm Springs. I did these for him for an interview on air.",
    acousticproduced: "Produced",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/1SEZ2K2bBCnBai7hs4Srgr",
    itunes: "https://itunes.apple.com/ph/album/shelly/1133048770?i=1133048951",
    bandcamp: "https://jonathanmann.bandcamp.com/track/ringtone-for-shelly",
    tags: "Electro, Person, Silly "
  },
  {
    number: 99,
    date: "2009-04-09T04:00:00.000Z",
    title: "When I Was Born",
    length: "1:17",
    inkey: "E",
    tempo: 65,
    topic: "Life",
    location: "Berkeley",
    instruments: "Vocals, Synths, Samples, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=aexHE2DueBA",
    description:
      "Wooooooo!!!! And it's my birthday! Wahoooo!!!!! Here's a song about me as a baby!!! OOOOOO!!!!",
    acousticproduced: "Produced",
    mood: "Pensive",
    spotify: "https://open.spotify.com/track/3w0E0Q9uYRUESKfYoJX7Pz",
    itunes:
      "https://itunes.apple.com/ph/album/when-i-was-born/1133048770?i=1133048952",
    bandcamp: "https://jonathanmann.bandcamp.com/track/when-i-was-born",
    tags: "Rock, Personal, Silly, Birthday, My Birthday"
  },
  {
    number: 100,
    date: "2009-04-10T04:00:00.000Z",
    title: "When the Lighthouse Went Dark",
    length: "1:29",
    inkey: "Dm",
    tempo: 70,
    topic: "Poetic ",
    location: "Berkeley",
    instruments: "Vocals, Electric Guitar, Samples, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=ySnfNdfESBE",
    description:
      "A request from my very good friend Alex Copeland, whom some of you know. He's also Spectre of Woods' brother (the Roll Cats Rapper!). He requested the song title. I wanted to make it in a style that I thought he'd like. Though he usually likes most of my music!",
    acousticproduced: "Produced",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/4ZYDjZfMHwExW3BCuOvoTP",
    itunes:
      "https://itunes.apple.com/ph/album/when-the-lighthouse-went-dark/1133048770?i=1133048953",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/when-the-lighthouse-went-dark",
    tags: "Metal, Dark,Scary"
  },
  {
    number: 101,
    date: "2009-04-11T04:00:00.000Z",
    title: "Zombie Banks",
    length: "1:14",
    inkey: "C",
    tempo: 115,
    topic: "Politics",
    location: "Berkeley",
    instruments: "Vocals, Piano, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=aCAPzJEpuCA",
    description:
      "I don't mean to come off as overly harsh in this song...oh wait, I do. The banks as they exist now must perish! Community banks are the way to go! A bank that gives back, a bank that's not for profit. It's the only way to curb the insane greed.",
    acousticproduced: "Produced",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/5aXNT5oCEKCodtvUVNAtr8",
    itunes:
      "https://itunes.apple.com/ph/album/zombie-banks/1133048770?i=1133048954",
    bandcamp: "https://jonathanmann.bandcamp.com/track/zombie-banks",
    tags: "Rock,Political, Funny, Zombie"
  },
  {
    number: 102,
    date: "2009-04-12T04:00:00.000Z",
    title: "Ringtone for Casey",
    length: "0:43",
    inkey: "F",
    tempo: 140,
    topic: "Ringtone",
    location: "Berkeley",
    instruments: "Vocals, Samples, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=mwBq8u7Fvx8",
    description:
      "This one is for Casey Dolan, who is a radio personality on 93.7 KCLB FM in Palm Springs. I did these for him for an interview on air. (Oops! I mixed up 102 and 103--oh well--)",
    acousticproduced: "Produced",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/6Ct804mRzQfdSpVID0cXjB",
    itunes: "https://itunes.apple.com/ph/album/casey/1133048770?i=1133048955",
    bandcamp: "https://jonathanmann.bandcamp.com/track/ringtone-for-casey",
    tags: "Electro, Person, Ringtone"
  },
  {
    number: 103,
    date: "2009-04-13T04:00:00.000Z",
    title: "Oreo Love",
    length: "1:34",
    inkey: "Am",
    tempo: 135,
    topic: "Food",
    location: "Berkeley",
    instruments: "Vocals, Harpsichord",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=BiI1lus4NGk",
    description: "A song request from Kiley! I rather like this song!",
    acousticproduced: "Produced",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/61cEf81KDZM8oh4NlxCmFz",
    itunes:
      "https://itunes.apple.com/ph/album/oreo-love/1133048770?i=1133048956",
    bandcamp: "https://jonathanmann.bandcamp.com/track/oreo-love",
    tags: "Folk,Silly, Food, Oreo"
  },
  {
    number: 104,
    date: "2009-04-14T04:00:00.000Z",
    title: "Ringtone for Jackie",
    length: "0:33",
    inkey: "G",
    tempo: 106,
    topic: "Ringtone",
    location: "Berkeley",
    instruments: "Vocals, Acoustic Guitar, Shaker",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=5B450Qpzuec",
    description:
      "#105 is a request from Johnny Wesson. It's for his wife Jackie. It's a ringtone. He said he likes to cook a lot, drink California wine, and be near water. He also said he liked Bob Dylan, so I tried to keep it folky.",
    acousticproduced: "Produced",
    mood: "Chill",
    spotify: "https://open.spotify.com/track/1sPbLxKvpCmnofzonimwrc",
    itunes: "https://itunes.apple.com/ph/album/jackie/1133048770?i=1133048957",
    bandcamp: "https://jonathanmann.bandcamp.com/track/ringtone-for-jackie",
    tags: "Folk, Person, Wistful"
  },
  {
    number: 105,
    date: "2009-04-15T04:00:00.000Z",
    title: "It's Like Trying to Fill a Styrofoam Cup With a Hole in the Bottom",
    length: "2:21",
    inkey: "A",
    tempo: 140,
    topic: "Object",
    location: "Berkeley",
    instruments: "Vocals, Piano, Electric Guitar, Samples, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=7CiTRHrA3vM",
    description:
      "This is a request from my really good friend Mikal. He's getting married soon! He also introduced me to my girlfriend, Ivory. Anyway, he requested this song. He has a really awesome blog where he posts his own music and musings.",
    acousticproduced: "Produced",
    mood: "Chill",
    spotify: "https://open.spotify.com/track/0gOHtoepNQUm2zBdmxBvj9",
    itunes:
      "https://itunes.apple.com/ph/album/its-like-trying-to-fill-styrofoam-cup-hole-in-bottom/1133048770?i=1133048958",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/its-like-trying-to-fill-a-styrofoam-cup-with-a-hole-in-the-bottom",
    tags: "Rock,Styrofoam Cup"
  },
  {
    number: 106,
    date: "2009-04-16T04:00:00.000Z",
    title: "Keyboard Shortcuts",
    length: "0:24",
    inkey: "G",
    tempo: 90,
    topic: "Nerd",
    location: "Berkeley",
    instruments: "Vocals, Acoustic Guitar, Drum Machine",
    beard: "N/A",
    videoid: "https://www.youtube.com/watch?v=gVT9SToJsMI",
    description:
      "This is a request by a VERY old friend named Nina. We used to play together as kids! I really like the way it came out! Shortest song a day song yet!! Wahoo!!",
    acousticproduced: "Produced",
    mood: "Chill",
    spotify: "https://open.spotify.com/track/61ccMlrcb6RS957fyEgsTa",
    itunes:
      "https://itunes.apple.com/ph/album/keyboard-shortcuts/1133048770?i=1133048959",
    bandcamp: "https://jonathanmann.bandcamp.com/track/keyboard-shortcuts",
    tags: "Ambient,Silly "
  },
  {
    number: 107,
    date: "2009-04-17T04:00:00.000Z",
    title: "Ringtone for Michaela",
    length: "0:54",
    inkey: "C",
    tempo: 60,
    topic: "Ringtone",
    location: "Berkeley",
    instruments: "Vocals, Piano, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=EY9vn2mXIsc",
    description: "Ringtone for MIchaela who likes wolves!",
    acousticproduced: "Produced",
    mood: "Pensive",
    spotify: "https://open.spotify.com/track/6S5Duho4ZCpqhC49koKS3o",
    itunes:
      "https://itunes.apple.com/ph/album/michaela/1133048770?i=1133048960",
    bandcamp: "https://jonathanmann.bandcamp.com/track/ringtone-for-michaela",
    tags: "Rock, Person, Wistful "
  },
  {
    number: 108,
    date: "2009-04-18T04:00:00.000Z",
    title: "Torture Memos: Waterboarding",
    length: "2:08",
    inkey: "D",
    tempo: 76,
    topic: "Politics",
    location: "Berkeley",
    instruments: "Vocals, Acoustic Guitar, Piano, Samples, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=sJSXbA9j0Js",
    description:
      "For this song, I took language directly from the torture memos. Lyrics below.",
    acousticproduced: "Produced",
    mood: "Angry",
    spotify: "https://open.spotify.com/track/5ate0SZfq2pmoPfU6H7sjT",
    itunes:
      "https://itunes.apple.com/ph/album/torture-memos-waterboarding/1133048770?i=1133048961",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/torture-memos-waterboarding",
    tags: "Rock, Dark, Songify, Political, SJW"
  },
  {
    number: 109,
    date: "2009-04-19T04:00:00.000Z",
    title: "I am israel, I am Palestine",
    length: "3:54",
    inkey: "F#",
    tempo: 67,
    topic: "Politics",
    location: "Berkeley",
    instruments: "Vocals, Acoustic Guitar, Electric Guitar, Bass, Shaker",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=paFtzERJ8hM",
    description:
      "It's many an artist's dream/nightmare to try to tackle really big issues in their art.",
    acousticproduced: "Produced",
    mood: "Pensive",
    spotify: "https://open.spotify.com/track/3eZBzbvAddiEG0cRP8AKnt",
    itunes:
      "https://itunes.apple.com/ph/album/i-am-israel-i-am-palestine/1133048770?i=1133048962",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/i-am-israel-i-am-palestine",
    tags: "Folk, Political, Middle East, Israel, Palestine"
  },
  {
    number: 110,
    date: "2009-04-20T04:00:00.000Z",
    title: "Cannabis Criminalization: a Short History in Song",
    length: "3:42",
    inkey: "Eb",
    tempo: 114,
    topic: "Politics",
    location: "Berkeley",
    instruments: "Vocals, Electric Guitar, Shaker",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=cNYbrO9OWP4",
    description: "Just like the title says. ",
    acousticproduced: "Produced",
    mood: "Silly\n",
    spotify: "https://open.spotify.com/track/4m5dwP9tuoA4XhA28yPXGT",
    itunes:
      "https://itunes.apple.com/ph/album/cannabis-criminalization-a-short-history-in-song/1133048770?i=1133048963",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/cannabis-criminalization-a-short-history-in-song",
    tags: "Country,Funny, Political, History, Educational"
  },
  {
    number: 111,
    date: "2009-04-21T04:00:00.000Z",
    title: "Wren the Polyamorous Polar Bear and His Story of Redemtion",
    length: "2:49",
    inkey: "E",
    tempo: 110,
    topic: "Animals",
    location: "Berkeley",
    instruments: "Vocals, Acoustic Guitar, Piano, Samples, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=ivfyckWwbww",
    description:
      "“Wren The Polyamorous Polar Bear And His Story of Redemption” I started to write a song about Earthday, and this is what came out.",
    acousticproduced: "Produced",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/7r3sjATFmkNBR4MH9YspVD",
    itunes:
      "https://itunes.apple.com/ph/album/wren-the-polyamorous-polar-bear-and-his-story-of-redemtion/1133048770?i=1133048964",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/wren-the-polyamorous-polar-bear-and-his-story-of-redemtion",
    tags: "Rock,Narrative, Funny, Nerd, Bear, Polar Bear"
  },
  {
    number: 112,
    date: "2009-04-22T04:00:00.000Z",
    title: "Fire Engine Red",
    length: "2:23",
    inkey: "F",
    tempo: 116,
    topic: "Commission",
    location: "Berkeley",
    instruments: "Vocals, Acoustic Guitar, Organ, Piano, Samples, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=_ekL68m7fMw",
    description:
      "#113 is a song request by the folks at www.fire-engine-red.com! They make admissions software for college websites...and they make it passionately.",
    acousticproduced: "Produced",
    mood: "Intense",
    spotify: "https://open.spotify.com/track/37lVGswhfZ8WDryLZN1FSv",
    itunes:
      "https://itunes.apple.com/ph/album/fire-engine-red/1133048770?i=1133048965",
    bandcamp: "https://jonathanmann.bandcamp.com/track/fire-engine-red",
    tags: "Rock, Heavy, Company "
  },
  {
    number: 113,
    date: "2009-04-23T04:00:00.000Z",
    title: "Spintown",
    length: "1:40",
    inkey: "G",
    tempo: 140,
    topic: "Commission",
    location: "Berkeley",
    instruments: "Vocals, Acoustic Guitar, Organ, Piano, Samples, Drum Machine",
    beard: "N/A",
    videoid: "https://www.youtube.com/watch?v=rFc3ew0BRnQ",
    description:
      "This is a song request from Travis Langworthy of www.spintown79.blogspot.com. He wanted a theme song! I got the archival square-dance footage from www.archive.org!! Awesome!",
    acousticproduced: "Produced",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/20pWu7jGTeejcNAIKXkMMY",
    itunes:
      "https://itunes.apple.com/ph/album/spintown/1133048770?i=1133048966",
    bandcamp: "https://jonathanmann.bandcamp.com/track/spintown",
    tags: "Rock, Heavy, Fun, Internet"
  },
  {
    number: 114,
    date: "2009-04-24T04:00:00.000Z",
    title: "Lindsay McCove",
    length: "0:35",
    inkey: "C",
    tempo: 120,
    topic: "Internet",
    location: "Berkeley",
    instruments: "Vocals, Electric Guitar, Samples",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=dvBDbdhCi4E",
    description: "It's short!",
    acousticproduced: "Produced",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/3r1WUVlDZIfGgQdv8xti3m",
    itunes:
      "https://itunes.apple.com/ph/album/lindsay-mccove/1133048770?i=1133048967",
    bandcamp: "https://jonathanmann.bandcamp.com/track/lindsay-mccove",
    tags: "Folk, Distortion, Person, Web Series, Dating"
  },
  {
    number: 115,
    date: "2009-04-25T04:00:00.000Z",
    title: "Steve, the Hippo With Multiple Personalities",
    length: "2:34",
    inkey: "C",
    tempo: 140,
    topic: "Animals",
    location: "Berkeley",
    instruments: "Vocals, Piano, Electric Guitar, Samples, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=QHwckqyrza4",
    description:
      "This is the story of a sad little Hippo, that nobody liked, because he was strange. He had multiple personalities. But one night a month, when the moon is full, Steve, the Hippo with multiple personalities rocks the jungle like no one else. And for that, he is respected.",
    acousticproduced: "Produced",
    mood: "SIlly",
    spotify: "https://open.spotify.com/track/3yrgC4ZbdIqIoJVlDtAcNb",
    itunes:
      "https://itunes.apple.com/ph/album/steve-the-hippo-and-his-multiple-personalities/1133048770?i=1133048968",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/steve-the-hippo-with-multiple-personalities",
    tags: "Rock, Fun,Narrative, Funny, Nerd, Hippo"
  },
  {
    number: 116,
    date: "2009-04-26T04:00:00.000Z",
    title: "Ringtone for Liam and Keane's Dad!",
    length: "0:33",
    inkey: "E",
    tempo: 120,
    topic: "Ringtone",
    location: "Berkeley",
    instruments: "Vocals, Piano, Samples, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=WpQ4KyQE0aI",
    description:
      "#118 comes in the form of a birthday ring tone request from Liam and Keane, for their papa! Here it is!",
    acousticproduced: "Produced",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/73LpqKZdasxrw083yMtKjM",
    itunes:
      "https://itunes.apple.com/ph/album/liam-and-keanes-dad/1133048770?i=1133048969",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/ringtone-for-liam-and-keanes-dad",
    tags: "Rock, Fun, Person"
  },
  {
    number: 117,
    date: "2009-04-27T04:00:00.000Z",
    title: "Don't Let Your Ovaries Get You Down",
    length: "1:03",
    inkey: "Bb",
    tempo: 106,
    topic: "Life",
    location: "Berkeley",
    instruments:
      "Vocals, Acoustic Guitar, Electric Guitar, Samples, Drum Machine",
    beard: "N/A",
    videoid: "https://www.youtube.com/watch?v=PgQY-8RETeE",
    description:
      "This one features my multi-talented, wonderful, sexy, awesome, beautiful girlfriend Ivory! A friend of hers was complaining the other day that she couldn't hang out because of her period-pains, and so Ivory said, \"Hey! Don't let your ovaries get you down!\"...and then she looked at me and said it should be a song. And I agreed.",
    acousticproduced: "Produced",
    mood: "Intense",
    spotify: "https://open.spotify.com/track/1I4xEJeySStkxvNwQBMI8f",
    itunes:
      "https://itunes.apple.com/ph/album/dont-let-your-ovaries-get-you-down/1133048770?i=1133048970",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/dont-let-your-ovaries-get-you-down",
    tags: "Rock, Fun, Motivational, Nerd, Health, Ivory King"
  },
  {
    number: 118,
    date: "2009-04-28T04:00:00.000Z",
    title: "Swine Flu: the Musical",
    length: "1:58",
    inkey: "A",
    tempo: 90,
    topic: "Politics ",
    location: "Berkeley",
    instruments: "Vocals, Piano, Electric Guitar, Samples, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=sgBm8jvg-bs",
    description:
      "You knew it was coming... the obligatory Jonathan Mann Swine Flu Musical!! Now, I'm not trying to say that it isn't something to be worried about necessarily, I just hate how \"the media\", (cable news, the Huffington Post, NPR, etc) give us just enough information to freak us out but no",
    acousticproduced: "Produced",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/2H47rsxYj7kQbpJpU59Blh",
    itunes:
      "https://itunes.apple.com/ph/album/swine-flu-the-musical/1133048770?i=1133048971",
    bandcamp: "https://jonathanmann.bandcamp.com/track/swine-flu-the-musical",
    tags: "Rock,Funny, Political, Health"
  },
  {
    number: 119,
    date: "2009-04-29T04:00:00.000Z",
    title: "Lost in the Tubes! a PSA in Song",
    length: "1:44",
    inkey: "C",
    tempo: 150,
    topic: "Internet",
    location: "Berkeley",
    instruments: "Vocals, Piano, Electric Guitar, Samples, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=YNB5kZkvLP8",
    description:
      "About the dangers of getting lost in the tubes...the INTERtubes, that is. What's the remedy? Watch and find out!",
    acousticproduced: "Produced",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/5sMLiOn9YENLTqB0MRfQrc",
    itunes:
      "https://itunes.apple.com/ph/album/lost-in-the-tubes-a-psa-in-song/1133048770?i=1133048972",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/lost-in-the-tubes-a-psa-in-song",
    tags: "Electro, Fun, Dancing, Motivational, Nerd, Internet"
  },
  {
    number: 120,
    date: "2009-04-30T04:00:00.000Z",
    title: "The Continuing Adventures of Bulldog and the Dude",
    length: "1:41",
    inkey: "Am",
    tempo: 105,
    topic: "Commission",
    location: "Berkeley",
    instruments: "Vocals, Piano, Electric Guitar, Samples, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=Mj1XlFVUURk",
    description:
      'I was on the radio this morning! In Maryland. At 6:30am my time. I was a little out of it. But, I do remember "Bulldog and The Dude: Rude Awakening Show" on WOCM and www.irieradio.com...and I remember that they requested a song! So I obliged!',
    acousticproduced: "Produced",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/0SK0bsCVptDw8akN3mITZm",
    itunes:
      "https://itunes.apple.com/ph/album/the-continuing-adventures-of-bulldog-and-the-dude/1133048770?i=1133048973",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/the-continuing-adventures-of-bulldog-and-the-dude",
    tags: "Country, Fun, Person, Silly, Famous Person, Radio"
  },
  {
    number: 121,
    date: "2009-05-01T04:00:00.000Z",
    title:
      "To: Sarah and Mike From: Meredith \nand Adam re: Sorry About your bikes",
    length: "1:11",
    inkey: "C",
    tempo: 120,
    topic: "Commission",
    location: "Berkeley",
    instruments: "Vocals, Piano, Synths, Samples, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=AHafu9FjIcE",
    description:
      "Here's the request I received: \"I was thinking a song by you would be a great way to apologize to our friends Sarah and Mike who got their bikes stolen from outside our apartment while we were all out getting dinner at the secret bibimbop place (they don't have a store front and it's hard to find, but it's really excellent). We feel extra bad because they're training for a cross country bike trip this summer and now have to buy fancy new bikes. They were super nice about it, but we could tell it really stressed them out.\"",
    acousticproduced: "Produced",
    mood: "Sad ",
    spotify: "https://open.spotify.com/track/2pJguppkp10GDj7UefOt3R",
    itunes:
      "https://itunes.apple.com/ph/album/sorry-about-your-bikes/1133048770?i=1133048974",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/to-sarah-and-mike-from-meredith-and-adam-re-sorry-about-your-bikes",
    tags: "Rock, Person, Fun, Apology"
  },
  {
    number: 122,
    date: "2009-05-02T04:00:00.000Z",
    title: "Happy Birthday Shaista",
    length: "2:23",
    inkey: "B",
    tempo: 116,
    topic: "Friend",
    location: "Berkeley",
    instruments: "Vocals, Baritone Uke",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=7hMjEwUcceg",
    description:
      "Today is my friend Shaista's birthday party, and so, along with her boyfriend, I wrote her a song! And everyone sang! Yay!",
    acousticproduced: "Acoustic",
    mood: "Happy",
    spotify: "https://open.spotify.com/track/5NPdts2edpSyTz9K4O9phJ",
    itunes:
      "https://itunes.apple.com/ph/album/happy-birthday-shaista/1133048770?i=1133048975",
    bandcamp: "https://jonathanmann.bandcamp.com/track/happy-birthday-shaista",
    tags: "Folk, Person, Fun, Birthday"
  },
  {
    number: 123,
    date: "2009-05-03T04:00:00.000Z",
    title: "We Are Pattern Machines",
    length: "2:18",
    inkey: "C",
    tempo: 85,
    topic: "Poetic ",
    location: "Berkeley",
    instruments: "Vocals, Piano, Synths, Samples, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=6oYXzpkRJME",
    description:
      "I can't figure out what # I'm on. Today's song is about patterns, and how we see them.",
    acousticproduced: "Produced",
    mood: "Intense",
    spotify: "https://open.spotify.com/track/03QU7zsjC1UYY9i0I26hsZ",
    itunes:
      "https://itunes.apple.com/ph/album/we-are-pattern-machines/1133048770?i=1133048976",
    bandcamp: "https://jonathanmann.bandcamp.com/track/we-are-pattern-machines",
    tags: "Rock, Dark,Wistful, Nerd, Science"
  },
  {
    number: 124,
    date: "2009-05-04T04:00:00.000Z",
    title: "Hey, Miss California",
    length: "2:34",
    inkey: "E",
    tempo: 140,
    topic: "Politics",
    location: "Berkeley",
    instruments: "Vocals, Electric Guitar, Claps  ",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=G-wKnV_ZTbo",
    description:
      "Is an ode for Carrie Prejean, fake titted Miss California turned anti-gay rights activist. I should point out that I have absolutely nothing against fake breasts or women who get them. It's really just Prejean and her fake boobs that I dislike. A lot.",
    acousticproduced: "Produced",
    mood: "Happy",
    spotify: "https://open.spotify.com/track/2ERqEzsNpCyeJtZ9jJEmgU",
    itunes:
      "https://itunes.apple.com/ph/album/hey-miss-california/1133048770?i=1133048977",
    bandcamp: "https://jonathanmann.bandcamp.com/track/hey-miss-california",
    tags: "Folk,Funny, Famous Person, Political"
  },
  {
    number: 125,
    date: "2009-05-05T04:00:00.000Z",
    title: "You Deserve a Bank Like This",
    length: "1:12",
    inkey: "F",
    tempo: 113,
    topic: "Commission",
    location: "Berkeley",
    instruments: "Vocals, Acoustic Guitar, Piano, Samples, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=C2a1UfbV7G0",
    description:
      "#126 is a jingle of sorts for a local community bank that I'm making a video for!",
    acousticproduced: "Produced",
    mood: "Happy",
    spotify: "https://open.spotify.com/track/0zbAeHvqvKq7TP9gR5gkiA",
    itunes:
      "https://itunes.apple.com/ph/album/you-deserve-a-bank-like-this/1133048770?i=1133048978",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/you-deserve-a-bank-like-this",
    tags: "Rock,Political, Economy, SJW"
  },
  {
    number: 126,
    date: "2009-05-06T04:00:00.000Z",
    title: "BIrthday Song for Mimi Hughes",
    length: "1:46",
    inkey: "F",
    tempo: 160,
    topic: "Commission",
    location: "Berkeley",
    instruments: "Vocals, Piano, Samples, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=5XcB67lzAMM",
    description:
      "#127 is a song request from Bree Hughes for her mom, Mimi! Yay!",
    acousticproduced: "Produced",
    mood: "Happy",
    spotify: "https://open.spotify.com/track/2xSFsI1VITYjgrZmDMKOcU",
    itunes:
      "https://itunes.apple.com/ph/album/birthday-song-for-mimi-hughes/1133048770?i=1133048979",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/birthday-song-for-mimi-hughes",
    tags: "Rock, Fun, Person, Birthday"
  },
  {
    number: 127,
    date: "2009-05-07T04:00:00.000Z",
    title: "Don't Give in to Madness",
    length: "2:39",
    inkey: "G",
    tempo: 153,
    topic: "Poetic ",
    location: "Berkeley",
    instruments: "Vocals, Acoustic Guitar",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=eXYrUSMJlrw",
    description:
      "I got a ton of requests for a song about the Santa Barbara fire. I took it in this direction.",
    acousticproduced: "Acoustic",
    mood: "Pensive",
    spotify: "https://open.spotify.com/track/7wSHC6E0yTCV0FjmYkK6ju",
    itunes:
      "https://itunes.apple.com/ph/album/dont-give-in-to-madness/1133048770?i=1133048980",
    bandcamp: "https://jonathanmann.bandcamp.com/track/dont-give-in-to-madness",
    tags: "Folk,Motivational "
  },
  {
    number: 128,
    date: "2009-05-08T04:00:00.000Z",
    title: "The Pitch",
    length: "2:12",
    inkey: "F",
    tempo: 125,
    topic: "Life",
    location: "Berkeley",
    instruments: "Vocals, Acoustic Guitar, Electric Guitar",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=-AxfNHQd-sY",
    description: "#130 is a pitch for a TV show. Let me know what you think!",
    acousticproduced: "Produced",
    mood: "Pensive",
    spotify: "https://open.spotify.com/track/2FlO5I0U4CkOLF3cGvffOX",
    itunes:
      "https://itunes.apple.com/ph/album/the-pitch/1133048770?i=1133049011",
    bandcamp: "https://jonathanmann.bandcamp.com/track/the-pitch",
    tags: "Folk,Narrative "
  },
  {
    number: 129,
    date: "2009-05-09T04:00:00.000Z",
    title: "Roll My Kroalnos Home",
    length: "2:16",
    inkey: "Am",
    tempo: 90,
    topic: "Poetic ",
    location: "Berkeley",
    instruments: "Vocals, Acoustic Guitar, Synths, Samples, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=NpAd2uG6CHk",
    description:
      "#131 has a made up word in the verse/title. Kroalnos. I wanted to sing something made up to sort of match the weirdness of the video. What do you think it should mean?",
    acousticproduced: "Produced",
    mood: "Intense",
    spotify: "https://open.spotify.com/track/0oIIVInhGBCeb9d1hEjNHl",
    itunes:
      "https://itunes.apple.com/ph/album/roll-my-kroalnos-home/1133048770?i=1133049012",
    bandcamp: "https://jonathanmann.bandcamp.com/track/roll-my-kroalnos-home",
    tags: "Rock, Dark,Backyard"
  },
  {
    number: 130,
    date: "2009-05-10T04:00:00.000Z",
    title: "Flying to Vienna Pt 1",
    length: "0:59",
    inkey: "Am",
    tempo: 141,
    topic: "Life",
    location: "Berkeley",
    instruments: "Vocals, Synths, Samples, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=07uO6bEpbWc",
    description:
      "Ivory and I are flying to Vienna today! Here's part one of a two part song, the other part of which I will upload when I land on the other side of the Atlantic ocean...",
    acousticproduced: "Produced",
    mood: "Intense",
    spotify: "https://open.spotify.com/track/4Dj4mcKw1tr24IYyGrQdyw",
    itunes:
      "https://itunes.apple.com/ph/album/flying-to-vienna-pt-1/1133048770?i=1133049013",
    bandcamp: "https://jonathanmann.bandcamp.com/track/flying-to-vienna-pt-1",
    tags: "Rock,Narrative, Travel"
  },
  {
    number: 131,
    date: "2009-05-11T04:00:00.000Z",
    title: "Flying to Vienna Pt 2",
    length: "0:56",
    inkey: "Am",
    tempo: 141,
    topic: "Life",
    location: "Vienna",
    instruments: "Vocals, Synths, Samples, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=waMjI15_USw",
    description: "I am so tired. Can you tell?",
    acousticproduced: "Produced",
    mood: "Intense",
    spotify: "https://open.spotify.com/track/4wKe56XCUcaPpIfF9HFrwN",
    itunes:
      "https://itunes.apple.com/ph/album/flying-to-vienna-pt-2/1133048770?i=1133049014",
    bandcamp: "https://jonathanmann.bandcamp.com/track/flying-to-vienna-pt-2",
    tags: "Rock,Narrative, Travel"
  },
  {
    number: 132,
    date: "2009-05-12T04:00:00.000Z",
    title: "GameDeals Theme",
    length: "0:36",
    inkey: "C",
    tempo: 170,
    topic: "Commission",
    location: "Vienna",
    instruments: "Vocals, Synths, Drum Machine",
    beard: "N/A",
    videoid: "https://www.youtube.com/watch?v=g_7zrWaN3oc",
    description:
      'So, a lot of you know that I used to host a video game show on the internet called GameJew. I got a song request from some old time fans of that show, and they wanted me to do a theme song for their new show, called "Game Deals". Check it out!',
    acousticproduced: "Produced",
    mood: "Intense",
    spotify: "https://open.spotify.com/track/0vSP0bmfNNpHMP6qY0k2JV",
    itunes:
      "https://itunes.apple.com/ph/album/gamedeals-theme/1133048770?i=1133049015",
    bandcamp: "https://jonathanmann.bandcamp.com/track/gamedeals-theme",
    tags:
      "Electro, Distortion, Person, Narrative, Nerd, Video Games, Web Series "
  },
  {
    number: 133,
    date: "2009-05-13T04:00:00.000Z",
    title: "Springtime in Vienna",
    length: "2:49",
    inkey: "Db",
    tempo: 88,
    topic: "Life",
    location: "Vienna",
    instruments: "Vocals, Acoustic Guitar",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=bh7qn8hBpeo",
    description:
      "Whilst sitting in my friend's backyard here in Vienna, it struck me that I could really be anywhere, with the same sights, sounds and feelings, though the languages of the birds and children may be different. It's a strange thing to realize, that no matter where you go, you are you.",
    acousticproduced: "Acoustic",
    mood: "Chill",
    spotify: "https://open.spotify.com/track/2vWCcAtayJxNx9h07OliDq",
    itunes:
      "https://itunes.apple.com/ph/album/springtime-in-vienna/1133048770?i=1133049017",
    bandcamp: "https://jonathanmann.bandcamp.com/track/springtime-in-vienna",
    tags: "Folk, Narrative, Place, Backyard"
  },
  {
    number: 134,
    date: "2009-05-14T04:00:00.000Z",
    title: "Why Do Potatoes Argue?",
    length: "1:05",
    inkey: "F",
    tempo: 80,
    topic: "Food",
    location: "Vienna",
    instruments: "Vocals, Synths, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=aZoUK8jtgbo",
    description:
      "#135 is a request from SuperDuperMan, about a bunch of potatoes arguing about what to be made into. I think it's pretty silly.",
    acousticproduced: "Produced",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/4VYcczgSFwXz50Q8dJAlWN",
    itunes:
      "https://itunes.apple.com/ph/album/why-do-potatoes-argue/1133048770?i=1133049018",
    bandcamp: "https://jonathanmann.bandcamp.com/track/why-do-potatoes-argue",
    tags: "Rock, Narrative, Funny, Nerd, Food, Potatoes"
  },
  {
    number: 135,
    date: "2009-05-15T04:00:00.000Z",
    title: "If You're Gonna Do It (Do It Yourself)",
    length: "2:36",
    inkey: "F#",
    tempo: 82,
    topic: "Poetic ",
    location: "Vienna",
    instruments: "Vocals, Baritone Uke",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=2qNC7kadXHk",
    description:
      "A song recorded and written in a construction zone near where I gave my talk tonight (which went really well, by the way, hopefully, I'll be able to get video)...I kind of like it. I wrote it on the spot, no rehearsal. Just made it up! Yay!",
    acousticproduced: "Acoustic",
    mood: "Chill",
    spotify: "https://open.spotify.com/track/0GKf43azvLhyFVG6UxHP1t",
    itunes:
      "https://itunes.apple.com/ph/album/if-youre-gonna-do-it-do-it-yourself/1133048770?i=1133049019",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/if-youre-gonna-do-it-do-it-yourself",
    tags: "Folk,Motivational "
  },
  {
    number: 136,
    date: "2009-05-16T04:00:00.000Z",
    title: "Old Man Sleeping By the Side of the Road",
    length: "2:04",
    inkey: "Gb",
    tempo: 80,
    topic: "Poetic ",
    location: "Vienna",
    instruments: "Vocals, Baritone Uke",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=UIIzeUAE5ds",
    description: "Not sure where it came from. Kind of hypnotic, methinks.",
    acousticproduced: "Acoustic",
    mood: "Chill",
    spotify: "https://open.spotify.com/track/3lKmjz622UYsttQQ2Pjf4P",
    itunes:
      "https://itunes.apple.com/ph/album/old-man-sleeping-by-the-side-of-the-road/1133048770?i=1133049020",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/old-man-sleeping-by-the-side-of-the-road",
    tags: "Folk, Dark,Narrative "
  },
  {
    number: 137,
    date: "2009-05-17T04:00:00.000Z",
    title: "There's a Hole in His Hat",
    length: "1:45",
    inkey: "E",
    tempo: 180,
    topic: "Life",
    location: "Vienna",
    instruments: "Vocals",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=txSXoLerzRc",
    description:
      "This is probably the strangest song a day so far, written late one night, totally randomly, while we just hanging around talking. We filmed it over brunch at Werkzeug H here in Vienna. You can see some of Andreas Stoiber aka Krach the Robot's work at www.monochrom.at/krach ! Enjoy my totally random, sleep deprived morning.",
    acousticproduced: "Acoustic",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/7zuuIZutvuOgq9fforbkKJ",
    itunes:
      "https://itunes.apple.com/ph/album/theres-a-hole-in-his-hat/1133048770?i=1133049021",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/theres-a-hole-in-his-hat",
    tags: "Acapella, Person, Fun, Nerd"
  },
  {
    number: 138,
    date: "2009-05-18T04:00:00.000Z",
    title: "Who Will Remain (2009)",
    length: "3:34",
    inkey: "F",
    tempo: 56,
    topic: "Poetic ",
    location: "Vienna",
    instruments: "Vocals, Piano, Samples, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=DNUs-sJYsDc",
    description: '"Who Will Remain?"',
    acousticproduced: "Produced",
    mood: "Intense",
    spotify: "https://open.spotify.com/track/311TjLy1afbFAN7JtAS9Iv",
    itunes:
      "https://itunes.apple.com/ph/album/who-will-remain/1133048770?i=1133049022",
    bandcamp: "https://jonathanmann.bandcamp.com/track/who-will-remain",
    tags: "Rock, Dark,Political"
  },
  {
    number: 139,
    date: "2009-05-19T04:00:00.000Z",
    title: "The Botanical Gardens of the Univeristy of Vienna",
    length: "2:29",
    inkey: "Ab",
    tempo: 117,
    topic: "Life",
    location: "Vienna",
    instruments: "Vocals, Baritone Uke",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=g5M2Vm58r0w",
    description:
      "#140 was filmed at the Botanical Garden of the University of Vienna. It was written and performed in segments, as we came upon interesting spots. It's a truly remarkable place, a veritable Noah's Ark of all manner of plant life. Very beautiful and serene. I highly recommend it to any visitor of Vienna!",
    acousticproduced: "Acoustic",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/5kqTXgReIcKwZGvpY4TOZk",
    itunes:
      "https://itunes.apple.com/ph/album/the-botanical-gardens-of-the-univeristy-of-vienna/1133048770?i=1133049023",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/the-botanical-gardens-of-the-univeristy-of-vienna",
    tags: "Folk, Fun, Place, Botanical Garden"
  },
  {
    number: 140,
    date: "2009-05-20T04:00:00.000Z",
    title: "Frodo Uses the Hobbit ATM",
    length: "2:15",
    inkey: "Dm",
    tempo: 120,
    topic: "Nerd",
    location: "Vienna",
    instruments: "Vocals, Piano, Samples, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=_jotZWp0398",
    description:
      "Johannes, my friend here in Vienna, showed me this ATM that was very low. He called it the Hobbit ATM and suggested I write a song about it!",
    acousticproduced: "Produced",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/4RuJMOtR0yParUZvI6Mw5o",
    itunes:
      "https://itunes.apple.com/ph/album/frodo-uses-the-hobbit-atm/1133048770?i=1133049024",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/frodo-uses-the-hobbit-atm",
    tags:
      "Rock, Dark,Narrative, Fun, Nerd, Book, Hobbit, Famous Person, Frodo, Object, ATM"
  },
  {
    number: 141,
    date: "2009-05-21T04:00:00.000Z",
    title: "A Sleepy German Train Ride",
    length: "1:11",
    inkey: "Gb",
    tempo: 106,
    topic: "Poetic ",
    location: "Vienna",
    instruments: "Vocals, Baritone Uke",
    beard: "N/A",
    videoid: "https://www.youtube.com/watch?v=vG38JS5SVj0",
    description:
      "We took a train today from Vienna to Cologne, where we're taking part in ANOTHER coference, this one is called Sigint: sigint.ccc.de/sigint/2009/wiki/Hauptseite",
    acousticproduced: "Acoustic",
    mood: "Chill",
    spotify: "https://open.spotify.com/track/2bW3gtE7fnmQmR2S3SfZK9",
    itunes:
      "https://itunes.apple.com/ph/album/a-sleepy-german-train-ride/1133048770?i=1133049025",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/a-sleepy-german-train-ride",
    tags: "Folk,Travel"
  },
  {
    number: 142,
    date: "2009-05-22T04:00:00.000Z",
    title: "What Are They Gonna Do?",
    length: "3:54",
    inkey: "E",
    tempo: 58,
    topic: "Politics",
    location: "Vienna",
    instruments: "Vocals, Baritone Uke",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=jVQovH2QTAQ",
    description:
      "A song I wrote really quickly for this conference, SIGINT. Then later on, I wrote another song that was sort of a SIGINT Anthem. You'll hear that soon, and you'll even see the process of me writing it. Yay!",
    acousticproduced: "Acoustic",
    mood: "Intense",
    spotify: "https://open.spotify.com/track/3liNhcB5xnLN4g1eaKWVEz",
    itunes:
      "https://itunes.apple.com/ph/album/what-are-they-gonna-do/1133048770?i=1133049026",
    bandcamp: "https://jonathanmann.bandcamp.com/track/what-are-they-gonna-do",
    tags: "Folk,Wistful, Nerd, Internet, Hackers"
  },
  {
    number: 143,
    date: "2009-05-23T04:00:00.000Z",
    title: "The CCC Anthem",
    length: "1:11",
    inkey: "Ab",
    tempo: 130,
    topic: "Politics ",
    location: "Vienna",
    instruments: "Vocals, Baritone Uke",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=EgHtBA-h5xo",
    description:
      "I wrote this live, in front of an audience, with their help. There's also a video of this process, you can see that here: http://vimeo.com/4809119",
    acousticproduced: "Acoustic",
    mood: "Intense",
    spotify: "https://open.spotify.com/track/083wALQx9qeD6srqcAGd5H",
    itunes:
      "https://itunes.apple.com/ph/album/the-ccc-anthem/1133048770?i=1133049027",
    bandcamp: "https://jonathanmann.bandcamp.com/track/the-ccc-anthem",
    tags: "Folk,Fun, Nerd, Internet, Hackers"
  },
  {
    number: 144,
    date: "2009-05-24T04:00:00.000Z",
    title: "Tarsiers Are My Friends",
    length: "3:34",
    inkey: "D#",
    tempo: 177,
    topic: "Animals",
    location: "Vienna",
    instruments: "Vocals, Baritone Uke",
    beard: "N/A",
    videoid: "https://www.youtube.com/watch?v=skAWxChA2HU",
    description:
      "What number am I on?! #147 is a song about Tarsiers, a request from a friend, Will Stenberg.",
    acousticproduced: "Acoustic",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/3wSMKk3j5SmlYTyBI04H7g",
    itunes:
      "https://itunes.apple.com/ph/album/tarsiers-are-my-friends/1133048770?i=1133049028",
    bandcamp: "https://jonathanmann.bandcamp.com/track/tarsiers-are-my-friends",
    tags: "Folk,Fun, Nerdy, Friend, Animals, Tarsiers"
  },
  {
    number: 145,
    date: "2009-05-25T04:00:00.000Z",
    title: "Meditation on Friends in the Key of G",
    length: "3:19",
    inkey: "C#",
    tempo: 92,
    topic: "Poetic ",
    location: "Vienna",
    instruments: "Vocals, Baritone Uke",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=Ordtl30Vd7s",
    description:
      "New friends make me think of old friends make me think of all the friends that I've ever had.",
    acousticproduced: "Acoustic",
    mood: "Chill",
    spotify: "https://open.spotify.com/track/7aZS6KpYDlYB1uUBqFqB2w",
    itunes:
      "https://itunes.apple.com/ph/album/meditation-on-friends-in-the-key-of-g/1133048770?i=1133049029",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/meditation-on-friends-in-the-key-of-g",
    tags: "Folk, Person, Friend"
  },
  {
    number: 146,
    date: "2009-05-26T04:00:00.000Z",
    title: "Floating Orb in Flame",
    length: "1:11",
    inkey: "Db",
    tempo: 97,
    topic: "Life",
    location: "Los Angeles",
    instruments: "Vocals, Baritone Uke",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=SWwBDvRUhfo",
    description: "We flew back to the states today. Been up a long time.",
    acousticproduced: "Acoustic",
    mood: "Chill",
    spotify: "https://open.spotify.com/track/13nVR9DsVBuBRFZR90KQJq",
    itunes:
      "https://itunes.apple.com/ph/album/floating-orb-in-flame/1133048770?i=1133049030",
    bandcamp: "https://jonathanmann.bandcamp.com/track/floating-orb-in-flame",
    tags: "Folk,Dark"
  },
  {
    number: 147,
    date: "2009-05-27T04:00:00.000Z",
    title: "Goodbye Vodka, Voddy",
    length: "2:12",
    inkey: "C",
    tempo: 140,
    topic: "Animals",
    location: "Los Angeles",
    instruments: "Vocals, Synths, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=QMliaYkuKv0",
    description:
      "My friend Mary's cat, Vodka, who she had from a kitten for 17 years just passed away. She had asked me to write her a song a few weeks ago...but I didn't get to it. Here you go, Mary. I hope it's a fitting tribute to the vampire kitty.",
    acousticproduced: "Produced",
    mood: "Sad",
    spotify: "https://open.spotify.com/track/5t1e9fAOfZ3eH6vv0rHNIE",
    itunes:
      "https://itunes.apple.com/ph/album/goodbye-vodka-voddy/1133048770?i=1133049031",
    bandcamp: "https://jonathanmann.bandcamp.com/track/goodbye-vodka-voddy",
    tags: "Electro, Dark, Friend, Cats"
  },
  {
    number: 148,
    date: "2009-05-28T04:00:00.000Z",
    title: "The Smog Gets Thicker",
    length: "1:48",
    inkey: "F",
    tempo: 83,
    topic: "Poetic ",
    location: "Los Angeles",
    instruments: "Vocals, Baritone Uke",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=fNDbEnetYuw",
    description: "looking in the mirror de ja vu",
    acousticproduced: "Acoustic",
    mood: "Chill",
    spotify: "https://open.spotify.com/track/2ujLPEAlWYusgMyC0DvEHz",
    itunes:
      "https://itunes.apple.com/ph/album/the-smog-gets-thicker/1133048770?i=1133049032",
    bandcamp: "https://jonathanmann.bandcamp.com/track/the-smog-gets-thicker",
    tags: "Folk,Good"
  },
  {
    number: 149,
    date: "2009-05-29T04:00:00.000Z",
    title: "Terror at Arkham (Arkham Horror: a True Story)",
    length: "3:45",
    inkey: "G#m",
    tempo: 163,
    topic: "Nerd",
    location: "Los Angeles",
    instruments: "Vocals, Baritone Uke",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=ATiFGv3rJdQ",
    description:
      "Some friends and I got together today to play an epic, HP Lovecraft based board game called \"Arkham Horror\". It's long, complicated, and unfortunately, only somewhat satisfying to win. It's also HARD.",
    acousticproduced: "Acoustic",
    mood: "Intense",
    spotify: "https://open.spotify.com/track/7zP77J95mFEk2Cjvxg9KKe",
    itunes:
      "https://itunes.apple.com/ph/album/terror-at-arkham-arkham-horror-a-true-story/1133048770?i=1133049033",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/terror-at-arkham-arkham-horror-a-true-story",
    tags:
      "Folk, Dark, Narrative, Board Game, Arkham Horror, A Scary, Silly, Myth, Collab, Sci-Fi, HP Lovecraft, Ivory, Heather Peralto, Brendan Whalen, Jason Brown"
  },
  {
    number: 150,
    date: "2009-05-30T04:00:00.000Z",
    title: "Gladiator Meow",
    length: "3:36",
    inkey: "F",
    tempo: 103,
    topic: "Poetic ",
    location: "Los Angeles",
    instruments: "Vocals, Baritone Uke",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=kN6Q-UEPQe0",
    description:
      "#151 is another request from my friend Alex. He wanted a sweet song about gay Roman Gladiators.",
    acousticproduced: "Produced",
    mood: "Chill",
    spotify: "https://open.spotify.com/track/3hMaKHzhyMMKNGaos41vsS",
    itunes:
      "https://itunes.apple.com/ph/album/gladiator-meow/1133048770?i=1133049034",
    bandcamp: "https://jonathanmann.bandcamp.com/track/gladiator-meow",
    tags: "Folk, Narrative"
  },
  {
    number: 151,
    date: "2009-05-31T04:00:00.000Z",
    title: "A Letter to the Killer of George Tiller",
    length: "2:39",
    inkey: "Db",
    tempo: 76,
    topic: "Politics",
    location: "Los Angeles",
    instruments: "Vocals, Baritone Uke, Samples, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=jYnggj-E92k",
    description:
      "George Tiller, a doctor famous for being attacked for performing late term abortions, was shot and killed today (Sunday, May 31st) by an (as of yet) unidentified gunman...while he was walking into his church. Now, I'm not really sure how I feel about late term abortion, though I very strongly come down on the side of a woman's right to make the most difficult decisions for herself. Either way, the one thing I am one hundred percent sure of is that killing is not the answer. For further reading, please see: http://www.salon.com/mwt/broadsheet/f...",
    acousticproduced: "Produced",
    mood: "Sad",
    spotify: "https://open.spotify.com/track/7rHB8s6uaTEhq3W0a5wzIW",
    itunes:
      "https://itunes.apple.com/ph/album/a-letter-to-the-killer-of-george-tiller/1133048770?i=1133049035",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/a-letter-to-the-killer-of-george-tiller",
    tags: "Folk,Dark, Frustrated, Political, George Tiller"
  },
  {
    number: 152,
    date: "2009-06-01T04:00:00.000Z",
    title: "Bandcamp.com Anthem",
    length: "2:13",
    inkey: "F",
    tempo: 184,
    topic: "Internet",
    location: "Los Angeles",
    instruments: "Vocals, Baritone Uke",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=B-KvxhEA6yA",
    description:
      "As it usually goes, when I find something I like, I write a song about it. Bandcamp.com! It's the best. I've been searching far and near for a good, simple, efficient way to distribute my music. And I have finally found it. I've started to upload everything, 12 years worth of material, to www.jonathanmannmusic.com (hosted by Bandcamp). Once I reach the Song A Day project, I'll be making every song available for download. You can download for free, or pay what you can afford...50 cents and higher. Pretty sweet. Check it out!",
    acousticproduced: "Produced",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/64A4vmVpUOVfF6Rx5OZqU9",
    itunes:
      "https://itunes.apple.com/ph/album/bandcamp-com-anthem/1133048770?i=1133049036",
    bandcamp: "https://jonathanmann.bandcamp.com/track/bandcamp-com-anthem",
    tags: "Folk, Fun, Nerd, Website, Bandcamp"
  },
  {
    number: 153,
    date: "2009-06-02T04:00:00.000Z",
    title: "Half Drunk Mugs of Tea",
    length: "2:29",
    inkey: "A",
    tempo: 107,
    topic: "Life",
    location: "Los Angeles",
    instruments: "Vocals, Baritone Uke",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=K2pWG8dkWys",
    description: "A song mostly about LA.",
    acousticproduced: "Acoustic",
    mood: "Pensive",
    spotify: "https://open.spotify.com/track/5E265yY1RuL1E3Nr5Y5M3L",
    itunes:
      "https://itunes.apple.com/ph/album/half-drunk-mugs-of-tea/1133048770?i=1133049037",
    bandcamp: "https://jonathanmann.bandcamp.com/track/half-drunk-mugs-of-tea",
    tags: "Folk, Delicate, Wistful, Political, Obama"
  },
  {
    number: 154,
    date: "2009-06-03T04:00:00.000Z",
    title: "Saved By the Bell Again",
    length: "1:55",
    inkey: "C",
    tempo: 125,
    topic: "TV",
    location: "Los Angeles",
    instruments: "Vocals, Synths, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=LOyW9H60n4Q",
    description:
      "So, Jimmy Fallon has a thing going where he's trying to get the members of Saved by the Bell to reunite on his Late Show. I used to watch this show constantly, just about every day. Honestly, I'm not sure why. But I loved it. And I think it would be great to get the old gang back together on air. It would make me feel all warm and fuzzy and nostalgic. And I LIKE feeling nostalgic. So! Enjoy.",
    acousticproduced: "Produced",
    mood: "Chill",
    spotify: "https://open.spotify.com/track/5eag7VldkwsgjagrUbHPd5",
    itunes:
      "https://itunes.apple.com/ph/album/saved-by-the-bell-again/1133048770?i=1133049038",
    bandcamp: "https://jonathanmann.bandcamp.com/track/saved-by-the-bell-again",
    tags: "Electro, Fun, Nerd, TV Show, Saved By The Bell"
  },
  {
    number: 155,
    date: "2009-06-04T04:00:00.000Z",
    title: "Don't Throw My Shoe at Me",
    length: "3:08",
    inkey: "Gb",
    tempo: 105,
    topic: "Commission",
    location: "Los Angeles",
    instruments: "Vocals, Piano",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=r5YKhCp9VM8",
    description:
      'Here\'s the song request I got: "Based on a friendly fight my boyfriend and I had yesterday, I would like to request: "Boyfriend - I love you, but please don\'t ever throw my shoe at me again" :) " Here it is! enjoy! That\'s my good friend Dylan McKenzie (of Derde Verde myspace.com/derdeverde)',
    acousticproduced: "Acoustic",
    mood: "Intense",
    spotify: "https://open.spotify.com/track/48dEbOQrJ9NxCtRsYo7VHX",
    itunes:
      "https://itunes.apple.com/ph/album/dont-throw-my-shoe-at-me/1133048770?i=1133049039",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/dont-throw-my-shoe-at-me",
    tags: "Rock, Rough, Catchy, Relationships, Collab, Dylan Mckenzie"
  },
  {
    number: 156,
    date: "2009-06-05T04:00:00.000Z",
    title: "This Here is a Subscribe Drive",
    length: "3:17",
    inkey: "C",
    tempo: 85,
    topic: "Song A Day",
    location: "Los Angeles",
    instruments: "Vocals, Baritone Uke",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=9PdVmitdUXU",
    description:
      "This here is a subscribe drive!!! Find one other persothat will enjoy my music and get them to subscribe!",
    acousticproduced: "Acoustic",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/4yhFFR6epprSNygKYGPgoD",
    itunes:
      "https://itunes.apple.com/ph/album/this-here-is-a-subscribe-drive/1133048770?i=1133049040",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/this-here-is-a-subscribe-drive",
    tags: "Folk, Personal, Funny, Plea Frustrated"
  },
  {
    number: 157,
    date: "2009-06-06T04:00:00.000Z",
    title: "Whiskey the Cat (And Other Songs)",
    length: "4:23",
    inkey: "D",
    tempo: 123,
    topic: "Life",
    location: "Oakland",
    instruments: "Vocals, Baritone Uke",
    beard: "N/A",
    videoid: "https://www.youtube.com/watch?v=0auEaoEbfJ4",
    description:
      "So, this is clearly a bit strange. The show that I was playing tonight was for Helenmae's cat, Whiskey who needs surgery. So naturally, I wrote Whiskey a song. But before I could sing the song, we had to get Helenmae into the room. So we sang her a song. So Ivory went to go look for her, and then we sang an Ivory song. And then, finally, we sang Helenmae a song. The only real problem is that you can't really see me, and someone was playing a tamborine right near the camera, so it's really loud. Anyway! Enjoy! (Oh, and the actual show went really well)",
    acousticproduced: "Acoustic",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/3twgPjWyofLXfx8GuMm4uU",
    itunes:
      "https://itunes.apple.com/ph/album/whiskey-the-cat-and-other-songs/1133048770?i=1133049041",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/whiskey-the-cat-and-other-songs",
    tags: "Folk, Live, Cats, Group of Strangers"
  },
  {
    number: 158,
    date: "2009-06-07T04:00:00.000Z",
    title: "Living My Life",
    length: "2:04",
    inkey: "G",
    tempo: 70,
    topic: "Poetic ",
    location: "Berkeley",
    instruments: "Vocals, Acoustic Guitar",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=DtmgYhxoQAE",
    description: "Some days you just live your life.",
    acousticproduced: "Acoustic",
    mood: "Chill",
    spotify: "https://open.spotify.com/track/40I0sBYIN9OTkDETFh5VbQ",
    itunes:
      "https://itunes.apple.com/ph/album/living-my-life/1133048770?i=1133049042",
    bandcamp: "https://jonathanmann.bandcamp.com/track/living-my-life",
    tags: "Folk, Heavy, Motivational"
  },
  {
    number: 159,
    date: "2009-06-08T04:00:00.000Z",
    title: "Beautiful Way to Live",
    length: "2:31",
    inkey: "A",
    tempo: 115,
    topic: "Poetic ",
    location: "Berkeley",
    instruments: "Vocals, Acoustic Guitar",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=GncGEr1I2n8",
    description: "Lyrics written by Elsa Bailey at www.elsajoy.com!",
    acousticproduced: "Produced",
    mood: "Chill",
    spotify: "https://open.spotify.com/track/4lFtdyw72u16s5uEyA6Gjw",
    itunes:
      "https://itunes.apple.com/ph/album/beautiful-way-to-live/1133048770?i=1133049043",
    bandcamp: "https://jonathanmann.bandcamp.com/track/beautiful-way-to-live",
    tags: "Folk, Wistful, Love"
  },
  {
    number: 160,
    date: "2009-06-09T04:00:00.000Z",
    title: "I Wanna Go Where the Wild Things Are",
    length: "2:32",
    inkey: "G",
    tempo: 100,
    topic: "Nerd",
    location: "Berkeley",
    instruments: "Vocals, Acoustic Guitar, Samples, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=l1gSKUJrZU0",
    description:
      'Spike Jonze is making "Where The Wild Things Are", one of my all time favorite childhood books, into a motion picture. I always really identified with Max, as I used to love to boss people around when I was little.',
    acousticproduced: "Produced",
    mood: "Happy",
    spotify: "https://open.spotify.com/track/4ji8vB6bwsJtvDKo9W744V",
    itunes:
      "https://itunes.apple.com/ph/album/i-wanna-go-where-the-wild-things-are/1133048770?i=1133049044",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/i-wanna-go-where-the-wild-things-are",
    tags: "Folk, Fun, Catchy, Book, Where The Wild Things Are"
  },
  {
    number: 161,
    date: "2009-06-10T04:00:00.000Z",
    title: "Freakonomics",
    length: "2:33",
    inkey: "F",
    tempo: 85,
    topic: "Internet",
    location: "Berkeley",
    instruments: "Vocals, Synths, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=gtaQQjadPjI",
    description:
      "Stephen Dubner posted a contest on his site, Freakonomics Blog, asking people for song requests. I suppsose it was inevitable that I would choose to do a Freakonomics theme song...",
    acousticproduced: "Produced",
    mood: "Chill",
    spotify: "https://open.spotify.com/track/5ro9ennmdNNJm1yGWonotx",
    itunes:
      "https://itunes.apple.com/ph/album/freakonomics/1133048770?i=1133049045",
    bandcamp: "https://jonathanmann.bandcamp.com/track/freakonomics",
    tags: "Electro,Fun, Catchy, Political, Book, Economy, Freakonomics"
  },
  {
    number: 162,
    date: "2009-06-11T04:00:00.000Z",
    title: "Isaac Newton Was a Total Badass",
    length: "2:40",
    inkey: "C",
    tempo: 75,
    topic: "Science",
    location: "Berkeley",
    instruments: "Vocals, Piano, Electric Guitar, Samples, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=LVHNHPliBoQ",
    description: "Sir Isaac!",
    acousticproduced: "Produced",
    mood: "Intense",
    spotify: "https://open.spotify.com/track/6xVCx7RuIdRT4Lhif5fGuz",
    itunes:
      "https://itunes.apple.com/ph/album/isaac-newton-was-a-total-badass/1133048770?i=1133049046",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/isaac-newton-was-a-total-badass",
    tags: "Rock, Fun, Nerd, Anthem, Science, Scientist, Isaac Newton"
  },
  {
    number: 163,
    date: "2009-06-12T04:00:00.000Z",
    title: "Joy and Freedom",
    length: "2:51",
    inkey: "F",
    tempo: 210,
    topic: "Poetic ",
    location: "Berkeley",
    instruments: "Vocals, Synths, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=_s8qpYYSGes",
    description: "Joy and Freedom.",
    acousticproduced: "Produced",
    mood: "Excited",
    spotify: "https://open.spotify.com/track/5EolimyeP1f59SkjQm36Hp",
    itunes:
      "https://itunes.apple.com/ph/album/joy-and-freedom/1133048770?i=1133049047",
    bandcamp: "https://jonathanmann.bandcamp.com/track/joy-and-freedom",
    tags: "Rock, Catchy, 80s, Hopeful, Fun, Love"
  },
  {
    number: 164,
    date: "2009-06-13T04:00:00.000Z",
    title: "We've Been Cooking All Day",
    length: "0:50",
    inkey: "D",
    tempo: 150,
    topic: "Life",
    location: "Berkeley",
    instruments: "Vocals, Synths, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=l3j8zAIxvqA",
    description: "Dinner party cooking time!",
    acousticproduced: "Produced",
    mood: "Excited",
    spotify: "https://open.spotify.com/track/0FMQsYafBXUYiQMTgWjRbr",
    itunes:
      "https://itunes.apple.com/ph/album/weve-been-cooking-all-day/1133048770?i=1133049048",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/weve-been-cooking-all-day",
    tags:
      "Electro, Silly, Nerd, Collab, Food, Cooking, Ivory King, Ross Copeland, Alex Copeland, Brad Aldridge, Joey Maxey, Madelyn Covey, Eliza Smith"
  },
  {
    number: 165,
    date: "2009-06-14T04:00:00.000Z",
    title: "I Will Follow You",
    length: "1:50",
    inkey: "C",
    tempo: 135,
    topic: "Poetic ",
    location: "Berkeley",
    instruments: "Vocals, Synths, Drum Machine",
    beard: "N/A",
    videoid: "https://www.youtube.com/watch?v=ruiLkgdPvn8",
    description: "I Will follow you.",
    acousticproduced: "Produced",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/6qVQrElsCnhwyi0d2Ch1hF",
    itunes:
      "https://itunes.apple.com/ph/album/i-will-follow-you/1133048770?i=1133049049",
    bandcamp: "https://jonathanmann.bandcamp.com/track/i-will-follow-you",
    tags: "Rock, Fun, Cheesy"
  },
  {
    number: 166,
    date: "2009-06-15T04:00:00.000Z",
    title: "Matthias Jamison-Koenig",
    length: "1:34",
    inkey: "F",
    tempo: 104,
    topic: "Commission",
    location: "Berkeley",
    instruments: "Vocals, Synths, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=yM1xPZsDNcw",
    description: "A song requst from Edie Jamison, Matthias' mom. Here you go!",
    acousticproduced: "Produced",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/0593zChHD0hH4c4WefaqW9",
    itunes:
      "https://itunes.apple.com/ph/album/matthias-jamison-koenig/1133048770?i=1133049050",
    bandcamp: "https://jonathanmann.bandcamp.com/track/matthias-jamison-koenig",
    tags: "Rock, Metal,  Delicate, Silly, Graduation"
  },
  {
    number: 167,
    date: "2009-06-16T04:00:00.000Z",
    title: "Keep Rocking, Iran",
    length: "2:01",
    inkey: "F",
    tempo: 139,
    topic: "Politics",
    location: "Berkeley",
    instruments: "Vocals, Acoustic Guitar, Piano, Samples, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=74vFgvJqJHE",
    description: "Keep rocking, Iran.",
    acousticproduced: "Produced",
    mood: "Intense",
    spotify: "https://open.spotify.com/track/6cqfAqW8VT5ylRR14EFawP",
    itunes:
      "https://itunes.apple.com/ph/album/keep-rocking-iran/1133048770?i=1133049051",
    bandcamp: "https://jonathanmann.bandcamp.com/track/keep-rocking-iran",
    tags: "Folk, Hopeful, Wistful, Political, Iran"
  },
  {
    number: 168,
    date: "2009-06-17T04:00:00.000Z",
    title: "I Quit!",
    length: "1:41",
    inkey: "F",
    tempo: 120,
    topic: "Commission",
    location: "Berkeley",
    instruments: "Vocals, Piano, Samples, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=RqgthhAzrlQ",
    description:
      "I got a request from someone who wanted to quit their job in song form! Too good to not do.",
    acousticproduced: "Produced",
    mood: "intense",
    spotify: "https://open.spotify.com/track/5ExkneLNkgfwiQ35bzMWPh",
    itunes: "https://itunes.apple.com/ph/album/i-quit/1133048770?i=1133049052",
    bandcamp: "https://jonathanmann.bandcamp.com/track/i-quit",
    tags: "Rock, Angry, Funny, Work"
  },
  {
    number: 169,
    date: "2009-06-18T04:00:00.000Z",
    title: "Vegetables",
    length: "1:21",
    inkey: "C",
    tempo: 120,
    topic: "PSA",
    location: "Berkeley",
    instruments: "Vocals, Synths, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=LPQf64JTUMI",
    description:
      "Vegetables have gotten a bad rap in this country, and I'm here to try to turn that trend around! It's all about how you prepare them. Vegetables are awesome!",
    acousticproduced: "Produced",
    mood: "Intense",
    spotify: "https://open.spotify.com/track/3XqY5iy6Gh8gxX0GD4WeLT",
    itunes:
      "https://itunes.apple.com/ph/album/vegetables/1133048770?i=1133049053",
    bandcamp: "https://jonathanmann.bandcamp.com/track/vegetables",
    tags: "Electro, Motivational, Fun, Nerd, Food, Educational, Vegetables"
  },
  {
    number: 170,
    date: "2009-06-19T04:00:00.000Z",
    title: "The Day Kangaroos Didn't Hop",
    length: "1:31",
    inkey: "G",
    tempo: 96,
    topic: "Animals",
    location: "Berkeley",
    instruments: "Vocals, Electric Guitar",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=vfe9rwlFgTY",
    description: "A sad day that will live in infamy!",
    acousticproduced: "Acoustic",
    mood: "Chill",
    spotify: "https://open.spotify.com/track/5jm2RuBAUNNJqBgkd6SehS",
    itunes:
      "https://itunes.apple.com/ph/album/the-day-kangaroos-didnt-hop/1133048770?i=1133049054",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/the-day-kangaroos-didnt-hop",
    tags: "Folk, Narrative, Silly, Nerd"
  },
  {
    number: 171,
    date: "2009-06-20T04:00:00.000Z",
    title: "What You Think It is",
    length: "2:31",
    inkey: "C",
    tempo: 107,
    topic: "Poetic ",
    location: "Berkeley",
    instruments: "Vocals, Acoustic Guitar, Synths, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=rPUsA7U3n2c",
    description: "It's different from what you think it is.",
    acousticproduced: "Produced",
    mood: "Chill",
    spotify: "https://open.spotify.com/track/61BgRnhvUgk43DbOIOVAmj",
    itunes:
      "https://itunes.apple.com/ph/album/what-you-think-it-is/1133048770?i=1133049055",
    bandcamp: "https://jonathanmann.bandcamp.com/track/what-you-think-it-is",
    tags: "Electro, Dark, Looming, Wistful"
  },
  {
    number: 172,
    date: "2009-06-21T04:00:00.000Z",
    title: "We Don't Change",
    length: "1:38",
    inkey: "F",
    tempo: 120,
    topic: "Poetic ",
    location: "Berkeley",
    instruments: "Vocals, Acoustic Guitar, Synths, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=zw8YWXMyUjw",
    description:
      "Continuing with the auto-tune electropop folk thing I have going, I present this song! I was turning forty yesterday and I was turning twenty",
    acousticproduced: "Produced",
    mood: "Sad",
    spotify: "https://open.spotify.com/track/1vFzexvybKeKdirzyZdXuP",
    itunes:
      "https://itunes.apple.com/ph/album/we-dont-change/1133048770?i=1133049056",
    bandcamp: "https://jonathanmann.bandcamp.com/track/we-dont-change",
    tags: "Electro, Distortion, Wistful"
  },
  {
    number: 173,
    date: "2009-06-22T04:00:00.000Z",
    title: "There's So Much to Know",
    length: "3:33",
    inkey: "G",
    tempo: 69,
    topic: "Poetic ",
    location: "Berkeley",
    instruments: "Vocals, Acoustic Guitar",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=wO3RaI7wY9c",
    description: "No auto-tuning!",
    acousticproduced: "Acoustic",
    mood: "Chill",
    spotify: "https://open.spotify.com/track/3aS4WZhGH9ES8nZWwN6U3N",
    itunes:
      "https://itunes.apple.com/ph/album/theres-so-much-to-know/1133048770?i=1133049057",
    bandcamp: "https://jonathanmann.bandcamp.com/track/theres-so-much-to-know",
    tags: "Folk, Wistful"
  },
  {
    number: 174,
    date: "2009-06-23T04:00:00.000Z",
    title: "The Rose of Hillside",
    length: "3:10",
    inkey: "C#m",
    tempo: 95,
    topic: "Poetic ",
    location: "Berkeley",
    instruments: "Vocals, Acoustic Guitar",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=XOMp-GJiLpA",
    description:
      "A story of the farmer and his wife. go said the farmer to his wife in december go and fetch the rose that grows in Hillside no said his wife as she straightened his blanket and so that night the farmer died the very next day she set out a walkin' clutching close to her breast the Rose of Hillside so though the frigid day was a knife cutting through her deep down she was warm inside far above the farmer's wife an eagle was flying deep in the brush there were eyes blinking wide she felt as though the forest were leaning down on her all bending towards the Rose of Hillside there is a town not far from here called alpha omega where the buildings are as tall as the streets are wide the farmer's wife came through and the whole town was empty the people there know about the Rose of Hillside all of this i watched with great anticipation that a lifetime of sorrow would soon subside for standing on my porch the farmer's wife a hand of giving and in the middle of her palm the rose of hillside",
    acousticproduced: "Produced",
    mood: "Sad",
    spotify: "https://open.spotify.com/track/66iqJEsncAahdq6XoGLMe4",
    itunes:
      "https://itunes.apple.com/ph/album/the-rose-of-hillside/1133048770?i=1133049058",
    bandcamp: "https://jonathanmann.bandcamp.com/track/the-rose-of-hillside",
    tags: "Folk, Dark, Narrative"
  },
  {
    number: 175,
    date: "2009-06-24T04:00:00.000Z",
    title: "You Stole My Money",
    length: "1:27",
    inkey: "Gm",
    tempo: 85,
    topic: "Life",
    location: "Berkeley",
    instruments: "Vocals, Synths, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=P15kjB-n6QI",
    description:
      "Ugh! I left my card in an ATM by accident and some JERK took it out and instead of RETURNING IT like any decent human being they USED it to buy $600 worth of stuff. So, Mr or Ms. Jerk, this song is for you.",
    acousticproduced: "Produced",
    mood: "Angry",
    spotify: "https://open.spotify.com/track/1kbzJ4QMyze60QZ0l6dHHq",
    itunes:
      "https://itunes.apple.com/ph/album/you-stole-my-money/1133048770?i=1133049059",
    bandcamp: "https://jonathanmann.bandcamp.com/track/you-stole-my-money",
    tags: "Rock, Dark, Scary, Frustrated, Theft"
  },
  {
    number: 176,
    date: "2009-06-25T04:00:00.000Z",
    title: "Happy Birthday, Adrian",
    length: "1:28",
    inkey: "D",
    tempo: 87,
    topic: "Life",
    location: "Berkeley",
    instruments: "Vocals, Baritone Uke",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=iQfC0XGc1Yg",
    description:
      "Yes! It's true! We're playing a series of free shows at the Uptown in Oakland, CA, every Tuesday for the next month! June 30th, July 7th, 14th and 28th! Please come! And...HAPPY BIRTHDAY ADRIAN!",
    acousticproduced: "Produced",
    mood: "Happy",
    spotify: "https://open.spotify.com/track/52Sd745bqPm2q75Z8wLlc0",
    itunes:
      "https://itunes.apple.com/ph/album/happy-birthday-adrian/1133048770?i=1133049060",
    bandcamp: "https://jonathanmann.bandcamp.com/track/happy-birthday-adrian",
    tags: "Folk, Birthday, Friend, The Rock Cookie Bottoms"
  },
  {
    number: 177,
    date: "2009-06-26T04:00:00.000Z",
    title: "I Used to Worship Michael Jackson",
    length: "2:58",
    inkey: "E",
    tempo: 100,
    topic: "Nerd",
    location: "Berkeley",
    instruments: "Vocals, Acoustic Guitar",
    beard: "N/A",
    videoid: "https://www.youtube.com/watch?v=rK7U_iNvH18",
    description:
      "A childhood hero dies, and I'm left with these memories. (It should be fairly obvious, but yes, that's me dancing at age 7.)",
    acousticproduced: "Produced",
    mood: "Pensive",
    spotify: "https://open.spotify.com/track/4ymZvusvDcR6gN4zgTtzrY",
    itunes:
      "https://itunes.apple.com/ph/album/i-used-to-worship-michael-jackson/1133048770?i=1133049061",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/i-used-to-worship-michael-jackson",
    tags: "Folk, Delicate, Wistful, Famous Person, Michael Jackson"
  },
  {
    number: 178,
    date: "2009-06-27T04:00:00.000Z",
    title: "The King Has a Bottom",
    length: "2:27",
    inkey: "Dm",
    tempo: 92,
    topic: "Poetic ",
    location: "Berkeley",
    instruments: "Vocals, Electric Guitar",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=eSIb-scnlwM",
    description: "A parable. rfirst we'll go by night then when coast is clear",
    acousticproduced: "Produced",
    mood: "Intense",
    spotify: "https://open.spotify.com/track/3L1YNJGAn6Xg0f2odbDV0u",
    itunes:
      "https://itunes.apple.com/ph/album/the-king-has-a-bottom/1133048770?i=1133049062",
    bandcamp: "https://jonathanmann.bandcamp.com/track/the-king-has-a-bottom",
    tags: "Folk, Dark, Distortion, Narrative"
  },
  {
    number: 179,
    date: "2009-06-28T04:00:00.000Z",
    title: "Words Stuck",
    length: "2:30",
    inkey: "Bb",
    tempo: 85,
    topic: "Poetic ",
    location: "Berkeley",
    instruments: "Vocals, Electric Guitar",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=o6TRmdmIRGQ",
    description: "Another parable, sort of. wandering down a road",
    acousticproduced: "Produced",
    mood: "Pensive",
    spotify: "https://open.spotify.com/track/5qTFWyvZ4YD5ES983XD4kP",
    itunes:
      "https://itunes.apple.com/ph/album/words-stuck/1133048770?i=1133049063",
    bandcamp: "https://jonathanmann.bandcamp.com/track/words-stuck",
    tags: "Folk, Distortion, Wistful"
  },
  {
    number: 180,
    date: "2009-06-29T04:00:00.000Z",
    title: "Down, Down, Down",
    length: "1:48",
    inkey: "F#",
    tempo: 108,
    topic: "Poetic ",
    location: "Berkeley",
    instruments: "Vocals, Electric Guitar",
    beard: "N/A",
    videoid: "https://www.youtube.com/watch?v=-KVb0uWXuDk",
    description: "Which way am I going?",
    acousticproduced: "Produced",
    mood: "Pensive",
    spotify: "https://open.spotify.com/track/70yBa2OG8dzaDf0pinZYRw",
    itunes:
      "https://itunes.apple.com/ph/album/down-down-down/1133048770?i=1133049064",
    bandcamp: "https://jonathanmann.bandcamp.com/track/down-down-down",
    tags: "Folk, Distortion, Wistful, Love"
  },
  {
    number: 181,
    date: "2009-06-30T04:00:00.000Z",
    title: "Take Medium Steps",
    length: "1:45",
    inkey: "F#",
    tempo: 84,
    topic: "Poetic ",
    location: "Berkeley",
    instruments: "Vocals, Electric Guitar",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=igChYNFQHNE",
    description: "A bit of advice.",
    acousticproduced: "Produced",
    mood: "Pensive",
    spotify: "https://open.spotify.com/track/2noC80r4Kiy5dGYhgvJHS6",
    itunes:
      "https://itunes.apple.com/ph/album/take-medium-steps/1133048770?i=1133049065",
    bandcamp: "https://jonathanmann.bandcamp.com/track/take-medium-steps",
    tags: "Folk, Delicate, Motivational, Frustrated"
  },
  {
    number: 182,
    date: "2009-07-01T04:00:00.000Z",
    title: "We'll All Be Fools",
    length: "2:28",
    inkey: "G#",
    tempo: 100,
    topic: "Poetic ",
    location: "Berkeley",
    instruments: "Vocals, Electric Guitar",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=pHISoIixUPk",
    description:
      "We played the first show of our residency yesterday, and that's where the footage comes from...unfortunately, the sound didn't come out at all, so you'll have to wait another week to see footage of us playing! But it went really, really well! Good turnout, lots of dancing, we had a blast!",
    acousticproduced: "Produced",
    mood: "Pensive",
    spotify: "https://open.spotify.com/track/2qYwhtmfgayRb5bWJAiswt",
    itunes:
      "https://itunes.apple.com/ph/album/well-all-be-fools/1133055443?i=1133055463",
    bandcamp: "https://jonathanmann.bandcamp.com/track/well-all-be-fools",
    tags: "Folk, Distortion, Wistful, Love"
  },
  {
    number: 183,
    date: "2009-07-02T04:00:00.000Z",
    title: "Steve Rouse Song",
    length: "2:11",
    inkey: "Dm",
    tempo: 200,
    topic: "Commission",
    location: "Berkeley",
    instruments: "Vocals, Electric Guitar",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=SBXkvQ350xU",
    description: "Song request from the folks at WBAL in Baltimore!",
    acousticproduced: "Produced",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/0JI8TvF1XnVBSALcIyOkYi",
    itunes:
      "https://itunes.apple.com/ph/album/steve-rouse-song/1133055443?i=1133055464",
    bandcamp: "https://jonathanmann.bandcamp.com/track/steve-rouse-song",
    tags: "Country, Dark, Famous Person, Radio, Steve Rouse"
  },
  {
    number: 184,
    date: "2009-07-03T04:00:00.000Z",
    title: "The Book of the New Sun",
    length: "3:58",
    inkey: "C#",
    tempo: 91,
    topic: "Nerd",
    location: "Berkeley",
    instruments: "Vocals, Electric Guitar",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=80JrlYzUJqY",
    description:
      'I just finished reading a really excellent series called "The Book of The New Sun" by Gene Wolfe. You should read it.',
    acousticproduced: "Produced",
    mood: "Intense",
    spotify: "https://open.spotify.com/track/3ZxTMjilqi4LBseMSCMON0",
    itunes:
      "https://itunes.apple.com/ph/album/the-book-of-the-new-sun/1133055443?i=1133055465",
    bandcamp: "https://jonathanmann.bandcamp.com/track/the-book-of-the-new-sun",
    tags: "Folk, Distortion, Dark, Rough, Book, The Book of The New Sun"
  },
  {
    number: 185,
    date: "2009-07-04T04:00:00.000Z",
    title: "I've Been Trying to Sneeze for 24 Hours",
    length: "1:46",
    inkey: "F#",
    tempo: 84,
    topic: "Sick",
    location: "Berkeley",
    instruments: "Vocals, Electric Guitar",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=zGPel3z-MJg",
    description: "This is a true story!",
    acousticproduced: "Produced",
    mood: "Sad",
    spotify: "https://open.spotify.com/track/6c0XUAD3Xdc7b78SSfc9sO",
    itunes:
      "https://itunes.apple.com/ph/album/ive-been-trying-to-sneeze-for-24-hours/1133055443?i=1133055466",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/ive-been-trying-to-sneeze-for-24-hours",
    tags: "Folk, Distortion, Funny"
  },
  {
    number: 186,
    date: "2009-07-05T04:00:00.000Z",
    title: "Palin's Resignation Speech in Song",
    length: "2:13",
    inkey: "C",
    tempo: 90,
    topic: "Politics",
    location: "Berkeley",
    instruments: "Vocals, Electric Guitar, Samples, Drum Machine",
    beard: "N/A",
    videoid: "https://www.youtube.com/watch?v=1TJX310iGR8",
    description: "Using words directly from her speech.",
    acousticproduced: "Produced",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/0otZol0lxw0tlOEBgjkI45",
    itunes:
      "https://itunes.apple.com/ph/album/palins-resignation-speech-in-song/1133055443?i=1133055467",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/palins-resignation-speech-in-song",
    tags: "Folk, Famous Person, Songify, Sarah Palin"
  },
  {
    number: 187,
    date: "2009-07-06T04:00:00.000Z",
    title: "If Your Love is on Fire",
    length: "2:18",
    inkey: "Em",
    tempo: 70,
    topic: "Love",
    location: "Berkeley",
    instruments: "Vocals, Electric Guitar, Samples, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=QQP598TPGPY",
    description:
      "I've decided to put the # in the title. This song is kinda rockin'...look out.",
    acousticproduced: "Produced",
    mood: "Intense",
    spotify: "https://open.spotify.com/track/3qJR1uWfwTj8yr62aXL4DY",
    itunes:
      "https://itunes.apple.com/ph/album/if-your-love-is-on-fire/1133055443?i=1133055468",
    bandcamp: "https://jonathanmann.bandcamp.com/track/if-your-love-is-on-fire",
    tags: "Rock, Distortion, Love, Anthem"
  },
  {
    number: 188,
    date: "2009-07-07T04:00:00.000Z",
    title: "Colors and Light",
    length: "2:16",
    inkey: "D",
    tempo: 120,
    topic: "Poetic ",
    location: "Berkeley",
    instruments: "Vocals, Acoustic Guitar, Samples, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=AU8JJjmwL0w",
    description: "“Colors and Light” Trippy…",
    acousticproduced: "Produced",
    mood: "Intense",
    spotify: "https://open.spotify.com/track/0SCK3fsOeZ8Z8lUzxQcluF",
    itunes:
      "https://itunes.apple.com/ph/album/colors-and-light/1133055443?i=1133055469",
    bandcamp: "https://jonathanmann.bandcamp.com/track/colors-and-light",
    tags: "Rock, Light, Dreamy, Hopeful, Love"
  },
  {
    number: 189,
    date: "2009-07-08T04:00:00.000Z",
    title: "Hunchback With a Dirty Mind",
    length: "2:33",
    inkey: "Gm",
    tempo: 100,
    topic: "Nerd",
    location: "Berkeley",
    instruments: "Vocals, Synths, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=peswE5IScyc",
    description: "Listen to what the hunchback with a dirty mind has to say.",
    acousticproduced: "Produced",
    mood: "Intense",
    spotify: "https://open.spotify.com/track/2zWzUKUVaOK3oYhlM4KSEl",
    itunes:
      "https://itunes.apple.com/ph/album/hunchbacks-dirty-mind/1133055443?i=1133055470",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/hunchback-with-a-dirty-mind",
    tags: "Electro, Delicate, Nerd, Silly, Hunchback"
  },
  {
    number: 190,
    date: "2009-07-09T04:00:00.000Z",
    title: "Time for Summer Now",
    length: "3:26",
    inkey: "A",
    tempo: 78,
    topic: "Poetic ",
    location: "Berkeley",
    instruments: "Vocals, Electric Guitar",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=cCzBQkKc7-s",
    description: "A summer anthem! Don't wear pants!",
    acousticproduced: "Produced",
    mood: "Happy",
    spotify: "https://open.spotify.com/track/5ApHhI5g1X7jc7NTdjr2eT",
    itunes:
      "https://itunes.apple.com/ph/album/time-for-summer-now/1133055443?i=1133055471",
    bandcamp: "https://jonathanmann.bandcamp.com/track/time-for-summer-now",
    tags: "Folk, Wistful, Fun"
  },
  {
    number: 191,
    date: "2009-07-10T04:00:00.000Z",
    title: "Mint Magician",
    length: "3:12",
    inkey: "G",
    tempo: 120,
    topic: "Nerd",
    location: "Berkeley",
    instruments: "Vocals, Synths, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=73aLfnZ4qO8",
    description:
      "song request from Erin Lyman, who is from the town next to my hometown, and is also the girlfriend of the other guitar player in the Rock Cookie Bottoms! She wrote to me, distraught, because Celestial Seasonings had removed the Unicorn from their packaging. Not even the Mint",
    acousticproduced: "Produced",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/62nb7E7bhSuAWZFwnKVXbP",
    itunes:
      "https://itunes.apple.com/ph/album/mint-magician/1133055443?i=1133055472",
    bandcamp: "https://jonathanmann.bandcamp.com/track/mint-magician",
    tags: "Electro, Silly, Light, Food, Tea, Celestial Seasons, Mint Magician"
  },
  {
    number: 192,
    date: "2009-07-11T04:00:00.000Z",
    title: "I'm From Vermont",
    length: "2:06",
    inkey: "C",
    tempo: 70,
    topic: "Life",
    location: "Berkeley",
    instruments: "Vocals, Piano, Samples, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=Ja9qJlRnug4",
    description:
      "A song about the state in which I grew up. A magical place where the roads are dirt, the mountains are green and anything is possible.",
    acousticproduced: "Produced",
    mood: "Pensive",
    spotify: "https://open.spotify.com/track/1nXC6wQgBt1ckez2SUXzP4",
    itunes:
      "https://itunes.apple.com/ph/album/im-from-vermont/1133055443?i=1133055473",
    bandcamp: "https://jonathanmann.bandcamp.com/track/im-from-vermont",
    tags: "Folk, Wistful, Dreamy, Growing Up, Vermont"
  },
  {
    number: 193,
    date: "2009-07-12T04:00:00.000Z",
    title: "Myspace is a Ghost Town",
    length: "1:00",
    inkey: "Am",
    tempo: 95,
    topic: "Internet",
    location: "Berkeley",
    instruments: "Vocals, Electric Guitar, Samples, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=Cqs081D3KqY",
    description:
      "A song about how nobody uses myspace anymore. I've set up a profile there for my band: www.myspace.com/rockcookiebottom",
    acousticproduced: "Produced",
    mood: "Sad",
    spotify: "https://open.spotify.com/track/7cZyDuRWeBEXtFa4KuSd5e",
    itunes:
      "https://itunes.apple.com/ph/album/myspace-is-a-ghost-town/1133055443?i=1133055474",
    bandcamp: "https://jonathanmann.bandcamp.com/track/myspace-is-a-ghost-town",
    tags: "Country, Dark, Internet, Myspace "
  },
  {
    number: 194,
    date: "2009-07-13T04:00:00.000Z",
    title: "When Harry Met Ginny",
    length: "3:07",
    inkey: "F",
    tempo: 95,
    topic: "Nerd",
    location: "Berkeley",
    instruments: "Vocals, Piano, Congas, Samples, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=YgAvbr9Gii0",
    description:
      "I'm so excited for the Harry Potter film. So I thought I'd show my love and support by writing this song. Enjoy!",
    acousticproduced: "Produced",
    mood: "Pensive",
    spotify: "https://open.spotify.com/track/0BdWvy6dFnLro7KcoiTXbZ",
    itunes:
      "https://itunes.apple.com/ph/album/when-harry-met-ginny/1133055443?i=1133055475",
    bandcamp: "https://jonathanmann.bandcamp.com/track/when-harry-met-ginny",
    tags: "Rock, Wistful, Fun, Book, Harry Potter, Ginny Weasley"
  },
  {
    number: 195,
    date: "2009-07-14T04:00:00.000Z",
    title: "Do the Monster Dance",
    length: "1:09",
    inkey: "C",
    tempo: 130,
    topic: "Kids",
    location: "Berkeley",
    instruments: "Vocals, Synths, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=Okp7xBZFJ2Q",
    description: "A song about a boy and his monster.",
    acousticproduced: "Produced",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/2XEppWhbYOJGAjMt0SfAXX",
    itunes:
      "https://itunes.apple.com/ph/album/do-the-monster-dance/1133055443?i=1133055476",
    bandcamp: "https://jonathanmann.bandcamp.com/track/do-the-monster-dance",
    tags: "Rock, Fun, Monster"
  },
  {
    number: 196,
    date: "2009-07-15T04:00:00.000Z",
    title: "Running Through the internet",
    length: "2:12",
    inkey: "E",
    tempo: 150,
    topic: "Internet",
    location: "Berkeley",
    instruments: "Vocals, Synths, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=Weka7PdYEtw",
    description:
      "A song about the perils of getting obsessed with the internet. i'm runnin' through the internet there was a time when i thought that the whole world revolved around it I know better know i must escape somehow and get back home sunsets on lolcats and the wisdom of the crowd in a hundred youtube comments memes fall like shooting stars there's no mine it's only ours it's a free for all where else could you find the answers to all life's questions can i get this popular guy to get me pregnant? where else can you find the fixes to all life's messes in advice from a video from somebody you don't even know I loved all of it each and every comedy skit every girl talking to the camera with a pretty accent every epic fail every cute cat tail every song and dance but now i'm on the run from the online video bums they hunt you down and surround you when you're least expecting them they are everywhere with their camera stare nobody's safe",
    acousticproduced: "Produced",
    mood: "Pensive",
    spotify: "https://open.spotify.com/track/6xNBa2DmscLuFu5gixQywC",
    itunes:
      "https://itunes.apple.com/ph/album/running-through-the-internet/1133055443?i=1133055477",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/running-through-the-internet",
    tags: "Electro, Dark, Internet"
  },
  {
    number: 197,
    date: "2009-07-16T04:00:00.000Z",
    title: "Baby, It All Led to You (An Evolutionary Love Song)",
    length: "4:08",
    inkey: "F",
    tempo: 100,
    topic: "Love",
    location: "Berkeley",
    instruments: "Vocals, Electric Guitar",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=CdokrUCr7-k",
    description: "This is for you.",
    acousticproduced: "Produced",
    mood: "Pensive",
    spotify: "https://open.spotify.com/track/2rtgtUoO6YLndwVTQJHryR",
    itunes:
      "https://itunes.apple.com/ph/album/baby-it-all-led-to-you-an-evolutionary-love-song/1133055443?i=1133055478",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/baby-it-all-led-to-you-an-evolutionary-love-song",
    tags: "Folk, Wistful, Love, Science, Evolution"
  },
  {
    number: 198,
    date: "2009-07-17T04:00:00.000Z",
    title: "The Little Prince",
    length: "2:16",
    inkey: "A#",
    tempo: 135,
    topic: "Nerd",
    location: "Los Angeles",
    instruments: "Vocals, Acoustic Guitar, Samples, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=PMSflgS_Y2M",
    description: "A song about The Little Prince. Up on planet B612",
    acousticproduced: "Produced",
    mood: "Sad",
    spotify: "https://open.spotify.com/track/0H8YVRngyMS6462H79W8h8",
    itunes:
      "https://itunes.apple.com/ph/album/the-little-prince/1133055443?i=1133055479",
    bandcamp: "https://jonathanmann.bandcamp.com/track/the-little-prince",
    tags: "Folk, Wistful, Delicate, book, The Little Prince"
  },
  {
    number: 199,
    date: "2009-07-18T04:00:00.000Z",
    title: "200 Songs",
    length: "0:59",
    inkey: "Bm",
    tempo: 113,
    topic: "Song A Day",
    location: "Los Angeles",
    instruments: "Vocals, Electric Guitar",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=optclFyzDnA",
    description:
      'It\'s really funny how when a song goes from being "just another song a day song" to "oh man, this is #200" it suddenly takes on more importance. Add to that only a few hours sleep last night, and I present this to you.',
    acousticproduced: "Produced",
    mood: "Pensive",
    spotify: "https://open.spotify.com/track/0sKSm4gLIQx9Czi156uNJJ",
    itunes:
      "https://itunes.apple.com/ph/album/200-songs/1133055443?i=1133055480",
    bandcamp: "https://jonathanmann.bandcamp.com/track/200-songs",
    tags: "Folk, Silly, Wistful, Milestone"
  },
  {
    number: 200,
    date: "2009-07-19T04:00:00.000Z",
    title: "Pictures of Plenty",
    length: "2:05",
    inkey: "E",
    tempo: 121,
    topic: "Poetic",
    location: "Los Angeles",
    instruments: "Vocals, Electric Guitar",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=GwjVeqKeep4",
    description: "Basically thoughts on an article I read today.",
    acousticproduced: "Produced",
    mood: "Pensive",
    spotify: "https://open.spotify.com/track/6dXoloIUVyEVfQzmJTlMnM",
    itunes:
      "https://itunes.apple.com/ph/album/pictures-of-plenty/1133055443?i=1133055481",
    bandcamp: "https://jonathanmann.bandcamp.com/track/pictures-of-plenty",
    tags: "Folk, Distortion, Wistful"
  },
  {
    number: 201,
    date: "2009-07-20T04:00:00.000Z",
    title: "Bing Goes the internet",
    length: "1:13",
    inkey: "Gm",
    tempo: 130,
    topic: "Contest",
    location: "Berkeley",
    instruments: "Vocals, Electric Guitar, Samples, Drum Machine",
    beard: "Shadow",
    videoid: "https://youtu.be/h9DBynJUCS4",
    description:
      '“Bing Goes the Internet."  Microsoft just announced this jingle/video contest today. So I decided to enter. Be sure to rate 5 stars! And send it to your friends. The video with the best rating and most views wins!',
    acousticproduced: "Produced",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/40DEH5ltS2ynYnaY9Mfa1P",
    itunes:
      "https://itunes.apple.com/ph/album/bing-goes-the-internet/1133055443?i=1133055482",
    bandcamp: "https://jonathanmann.bandcamp.com/track/bing-goes-the-internet",
    tags: "Rock, Cheesy, Fun, Catchy"
  },
  {
    number: 202,
    date: "2009-07-21T04:00:00.000Z",
    title: "I am a Crazy Piccachu",
    length: "1:35",
    inkey: "C",
    tempo: 130,
    topic: "Nerd",
    location: "Berkeley",
    instruments: "Vocals, Electric Guitar, Samples, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=eocDr_8BW_Y",
    description: "A mask! I'm wearing a mask!",
    acousticproduced: "Produced",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/0p32binqfYqKfashbhexcf",
    itunes:
      "https://itunes.apple.com/ph/album/i-am-a-crazy-piccachu/1133055443?i=1133055483",
    bandcamp: "https://jonathanmann.bandcamp.com/track/i-am-a-crazy-piccachu",
    tags: "Rock, Fun, Light, NES, Pikachu"
  },
  {
    number: 203,
    date: "2009-07-22T04:00:00.000Z",
    title: "Bike Love",
    length: "1:49",
    inkey: "C",
    tempo: 155,
    topic: "Bike",
    location: "Berkeley",
    instruments: "Vocals, Electric Guitar, Samples, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=TAlhgKWEqWE",
    description:
      "A song about riding bikes that love each other as much as those that are riding them.",
    acousticproduced: "Produced",
    mood: "Happy",
    spotify: "https://open.spotify.com/track/3G1NbxTvHTBXBpdCQwj994",
    itunes:
      "https://itunes.apple.com/ph/album/bike-love/1133055443?i=1133055484",
    bandcamp: "https://jonathanmann.bandcamp.com/track/bike-love",
    tags: "Rock, Fun, Light, Love"
  },
  {
    number: 204,
    date: "2009-07-23T04:00:00.000Z",
    title: "Commondreams.org",
    length: "1:07",
    inkey: "Am",
    tempo: 73,
    topic: "Commission",
    location: "Berkeley",
    instruments: "Vocals, Piano, Acoustic Guitar, Samples, Drum Machine",
    beard: "Beard",
    videoid: "https://www.youtube.com/watch?v=j7lF18vQ5HI",
    description:
      "www.commondreams.org, the leading website for all things progressive politics asked me to write them a song and make a video. Here it is!",
    acousticproduced: "Produced",
    mood: "Intense",
    spotify: "https://open.spotify.com/track/4cKLWWP1ondbaokA80Rk69",
    itunes:
      "https://itunes.apple.com/ph/album/commondreams-org/1133055443?i=1133055485",
    bandcamp: "https://jonathanmann.bandcamp.com/track/commondreams-org",
    tags: "Rock, Heavy, Political, Social Justice"
  },
  {
    number: 205,
    date: "2009-07-24T04:00:00.000Z",
    title: "Look at That Deer, Licking That Cat",
    length: "2:03",
    inkey: "C",
    tempo: 71,
    topic: "Animals",
    location: "Berkeley",
    instruments: "Vocals, Synths, Drum Machine",
    beard: "N/A",
    videoid: "https://www.youtube.com/watch?v=vR-vY5fzTeA",
    description: "Look at that deer licking that cat!",
    acousticproduced: "Produced",
    mood: "Chill",
    spotify: "https://open.spotify.com/track/5VYVejL1z2YhbGt62cE2XM",
    itunes:
      "https://itunes.apple.com/ph/album/look-at-that-deer-licking-that-cat/1133055443?i=1133055486",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/look-at-that-deer-licking-that-cat",
    tags: "Rock, Wistful, Narrative, Animals, Cats, Deer"
  },
  {
    number: 206,
    date: "2009-07-25T04:00:00.000Z",
    title: "The Robots Don't Love You Anymore",
    length: "1:51",
    inkey: "G",
    tempo: 141,
    topic: "Nerd",
    location: "Berkeley",
    instruments: "Vocals, Electric Guitar, Synths, Drum Machine",
    beard: "N/A",
    videoid: "https://www.youtube.com/watch?v=JflvA6n86Wk",
    description:
      "A song title request. This marks the triumphant return of Novox The Robot, my robot recording buddy! If you want to hear more of our collaborations, go here: www.jonathanmannmusic.com",
    acousticproduced: "Produced",
    mood: "Intense",
    spotify: "https://open.spotify.com/track/6UKuT6G6SDNOdSrdlaa6fb",
    itunes:
      "https://itunes.apple.com/ph/album/the-robots-dont-love-you-anymore/1133055443?i=1133055487",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/the-robots-dont-love-you-anymore",
    tags: "Electro, Dark, Good, Catchy, Robots"
  },
  {
    number: 207,
    date: "2009-07-26T04:00:00.000Z",
    title: "Ocean",
    length: "1:44",
    inkey: "C",
    tempo: 77,
    topic: "Poetic",
    location: "Berkeley",
    instruments: "Vocals, Synths, Drum Machine",
    beard: "N/A",
    videoid: "https://www.youtube.com/watch?v=G1YC_fTssUQ",
    description:
      "LYRICS: maybe we weren't ever supposed to leave but some enterprising fish believed that happiness could be found on the land",
    acousticproduced: "Produced",
    mood: "Chill",
    spotify: "https://open.spotify.com/track/54lOsB3ApDotNxsyaARC3k",
    itunes: "https://itunes.apple.com/ph/album/ocean/1133055443?i=1133055488",
    bandcamp: "https://jonathanmann.bandcamp.com/track/ocean",
    tags: "Electro, Wistful, Dreamy, Catchy, Good, Vocoder"
  },
  {
    number: 208,
    date: "2009-07-27T04:00:00.000Z",
    title: "The Kind of Song You'd Hear in a 90s Noir B-Movie",
    length: "3:30",
    inkey: "B",
    tempo: 115,
    topic: "Poetic",
    location: "Berkeley",
    instruments: "Vocals, Synths, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=NGCO-9ziY4I",
    description:
      "I'm pretty sure that the chorus melody sounds exactly like another song, but I can't figure out what it is.",
    acousticproduced: "Produced",
    mood: "Intense",
    spotify: "https://open.spotify.com/track/4isvL2Rb2u3Tgj7uieqG65",
    itunes:
      "https://itunes.apple.com/ph/album/the-kind-of-song-youd-hear-in-a-90s-noir-b-movie/1133055443?i=1133055489",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/the-kind-of-song-youd-hear-in-a-90s-noir-b-movie",
    tags: "Electro, Cheesy, Dark, Heavy"
  },
  {
    number: 209,
    date: "2009-07-28T04:00:00.000Z",
    title: "Two Chords",
    length: "1:21",
    inkey: "G",
    tempo: 80,
    topic: "Poetic",
    location: "Berkeley",
    instruments: "Vocals, Electric Guitar, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=UY31lHRJwfY",
    description:
      "What can I say with just two chords, my voice and a simple beat?",
    acousticproduced: "Produced",
    mood: "Pensive",
    spotify: "https://open.spotify.com/track/5miQhEUl0snrVPvVx9YVjX",
    itunes:
      "https://itunes.apple.com/ph/album/two-chords/1133055443?i=1133055490",
    bandcamp: "https://jonathanmann.bandcamp.com/track/two-chords",
    tags: "Rock, Light, Silly"
  },
  {
    number: 210,
    date: "2009-07-29T04:00:00.000Z",
    title: "Games and Sounds",
    length: "1:09",
    inkey: "G",
    tempo: 120,
    topic: "Video Games",
    location: "Berkeley",
    instruments: "Vocals, Synths, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=IQDXq2zpBCI",
    description:
      "This is a requst for my friend Robert! If you're wondering where # 211 is, well, it's all Butterfinger and Yahoo's fault. I entered another video contest, a Butterfinger one, and they haven't approved my video yet. As soon as they do, I'll let you know!",
    acousticproduced: "Produced",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/2w8DIxzEqWW2pocqFA3ngx",
    itunes:
      "https://itunes.apple.com/ph/album/games-and-sounds/1133055443?i=1133055491",
    bandcamp: "https://jonathanmann.bandcamp.com/track/games-and-sounds",
    tags: "Electro, Light, Theme Song, Web series"
  },
  {
    number: 211,
    date: "2009-07-30T04:00:00.000Z",
    title: "Gone Like the Dodo",
    length: "2:17",
    inkey: "Am",
    tempo: 95,
    topic: "Poetic",
    location: "Berkeley",
    instruments: "Vocals, Synths, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=sxjkIgsppwc",
    description:
      "there's a place that i know where the wild things grow and the rose rises up like a pheonix and the ladies exclaim and dawdle and feign but only i know it's secret gone like the dodo there's a skull and some teeth that are buried beneath a mixture of clay and of sandstone where my true love died when i buried her alive to keep her from knowing what i know gone like the dodo i don't want you to come and look for me",
    acousticproduced: "Produced",
    mood: "Pensive",
    spotify: "https://open.spotify.com/track/1ze2ri95XexLC5jrNosR0E",
    itunes:
      "https://itunes.apple.com/ph/album/gone-like-the-dodo/1133055443?i=1133055492",
    bandcamp: "https://jonathanmann.bandcamp.com/track/gone-like-the-dodo",
    tags: "Electro, Wistful, Vocoder, Dreamy, Dark"
  },
  {
    number: 212,
    date: "2009-07-31T04:00:00.000Z",
    title: "Time Capsule",
    length: "1:27",
    inkey: "G",
    tempo: 140,
    topic: "Poetic",
    location: "Berkeley",
    instruments: "Vocals, Synths, Drum Machine",
    beard: "N/A",
    videoid: "https://www.youtube.com/watch?v=F02hhkUDhuI",
    description:
      "don't break the seal on this capsule that i'm filling with the artifacts of ordinary life the future will unravel all the mysteries of modern day politics and they will set it right",
    acousticproduced: "Produced",
    mood: "Happy",
    spotify: "https://open.spotify.com/track/3xLLZcEMNYMcehRnkCZKB9",
    itunes:
      "https://itunes.apple.com/ph/album/time-capsule/1133055443?i=1133055493",
    bandcamp: "https://jonathanmann.bandcamp.com/track/time-capsule",
    tags: "Electro, Cheesy, 80s, Vocoder, Rough"
  },
  {
    number: 213,
    date: "2009-08-01T04:00:00.000Z",
    title: "Nic Kaelin",
    length: "1:16",
    inkey: "C",
    tempo: 100,
    topic: "Friend",
    location: "Berkeley",
    instruments: "Vocals, Synths, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=QHcF-qwEs_M",
    description:
      "In what is becoming a band tradition, here is my trumpet player and good friend's birthday song. I hope he doesn't move away to NYC.",
    acousticproduced: "Produced",
    mood: "Happy",
    spotify: "https://open.spotify.com/track/79rKIGJDHf4TQGhwTDeyUq",
    itunes:
      "https://itunes.apple.com/ph/album/nic-kaelin/1133055443?i=1133055494",
    bandcamp: "https://jonathanmann.bandcamp.com/track/nic-kaelin",
    tags: "Rock, Cheesy, Light, Birthday"
  },
  {
    number: 214,
    date: "2009-08-02T04:00:00.000Z",
    title: "Life With Cha Cha is in Sonic Technicolor",
    length: "2:15",
    inkey: "C",
    tempo: 130,
    topic: "Contest",
    location: "Berkeley",
    instruments: "Vocals, Synths, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=012_5is488Y",
    description: "And ad commissioned by ChaCha.",
    acousticproduced: "Produced",
    mood: "Chill",
    spotify: "https://open.spotify.com/track/6Ka6LyGXPlPWPvjdM4UMIl",
    itunes:
      "https://itunes.apple.com/ph/album/cha-cha-is-sonic-technicolor/1133055443?i=1133055495",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/live-with-cha-cha-is-in-sonic-technicolor",
    tags: "Rock, Fun, Dark, Catchy, Cha Cha"
  },
  {
    number: 215,
    date: "2009-08-03T04:00:00.000Z",
    title: "Let Your Ears Decide",
    length: "1:30",
    inkey: "E",
    tempo: 170,
    topic: "Contest",
    location: "Berkeley",
    instruments: "Vocals, Piano, Synths, Drum Machine",
    beard: "N/A",
    videoid: "https://www.youtube.com/watch?v=5jR84NTwRF4",
    description:
      "Another day, another video contest. This one for Phillips' new line of mp3 players.",
    acousticproduced: "Produced",
    mood: "Chill",
    spotify: "https://open.spotify.com/track/6u05bi204mjSRqz1k1dezc",
    itunes:
      "https://itunes.apple.com/ph/album/let-your-ears-decide/1133055443?i=1133055496",
    bandcamp: "https://jonathanmann.bandcamp.com/track/let-your-ears-decide",
    tags: "Rock, Bad, Cheesy"
  },
  {
    number: 216,
    date: "2009-08-04T04:00:00.000Z",
    title: "Wash Your Hands!",
    length: "0:30",
    inkey: "C",
    tempo: 100,
    topic: "Contest",
    location: "Berkeley",
    instruments: "Vocals, Piano, Synths, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=bT-Ktx8Qpc0",
    description:
      "A PSA about the importance of washing your hands to prevent the contraction and spread of flu viruses. www.flu.gov",
    acousticproduced: "Produced",
    mood: "Happy",
    spotify: "https://open.spotify.com/track/1rMJNvcKdbpIQbqBRGIfJK",
    itunes:
      "https://itunes.apple.com/ph/album/wash-your-hands/1133055443?i=1133055497",
    bandcamp: "https://jonathanmann.bandcamp.com/track/wash-your-hands",
    tags: "Rock, Fun, Educational, Hand Washing"
  },
  {
    number: 217,
    date: "2009-08-05T04:00:00.000Z",
    title: "I am MG Siegler",
    length: "0:58",
    inkey: "D#",
    tempo: 163,
    topic: "Internet",
    location: "Berkeley",
    instruments: "Vocals, Synths, Drum Machine",
    beard: "N/A",
    videoid: "https://www.youtube.com/watch?v=ybsRCQy_3xQ",
    description:
      "The article the song refers to: http://bit.ly/Yk9Uk \r\n\r\nSo, those that know me, know that I don’t often address internet critics. Everyone’s got an opinion, no use getting up in arms about it. But MG Siegler’s post on TechCrunch was so nasty, and so high profile, that it seemed like I had to strike back. And so I have. I present to you, “I’m MG Siegler”, in which I throw his words back at him, and more. One note: The part about him blowing his boss…that’s completely made up. I really just wanted to use the rhyme “careington/arrington”. Enjoy!",
    acousticproduced: "Produced",
    mood: "Intense",
    spotify: "https://open.spotify.com/track/515xsfOnATJxMW3Co1KTXZ",
    itunes:
      "https://itunes.apple.com/ph/album/i-am-mg-siegler/1133055443?i=1133055498",
    bandcamp: "https://jonathanmann.bandcamp.com/track/i-am-mg-siegler",
    tags: "Electro, Fun, Light, Funny, Silly, Famous Person, MG Sieglar"
  },
  {
    number: 218,
    date: "2009-08-06T04:00:00.000Z",
    title: "The Big Picture With David Shuster",
    length: "1:46",
    inkey: "F",
    tempo: 96,
    topic: "TV",
    location: "Berkeley",
    instruments: "Vocals, Synths, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=wySpD3mUx2M",
    description:
      'So, David Shuster asked me to write a song about his new show "The Big Picture" which he hosts with Tamron Hall. Awesome! It airs weekdays from 3pm-5pm! Here\'s the song!',
    acousticproduced: "Produced",
    mood: "Chill",
    spotify: "https://open.spotify.com/track/00QcdhTvNiyPw06aoDcP4P",
    itunes:
      "https://itunes.apple.com/ph/album/the-big-picture-and-david-shuster/1133055443?i=1133055499",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/the-big-picture-with-david-shuster",
    tags: "Electro, Bad, Cheesy, Famous Person, Tamron Hall, David Shuster"
  },
  {
    number: 219,
    date: "2009-08-07T04:00:00.000Z",
    title: "That Dastardly Villian, MG",
    length: "1:29",
    inkey: "G",
    tempo: 105,
    topic: "Internet",
    location: "Berkeley",
    instruments: "Vocals, Piano, Synths, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=DxYlmF2NV2E",
    description:
      "My twitter account got hacked last week then you posted about it you thought somehow that meant you won then it was reinstated if this were star wars you'd be the death star if it were lord of the rings you live in modor if this were the smurfs you'd be gargamel if this were harry potter you'd be voldermort you can mess around with my website name it's rock cookie bottom bitch what does MG stand for anyway? Or is it just your sissy pen name",
    acousticproduced: "Produced",
    mood: "Intense",
    spotify: "https://open.spotify.com/track/2EXbSG82woxeYn4Nketo5U",
    itunes:
      "https://itunes.apple.com/ph/album/that-dastardly-villian-mg/1133055443?i=1133055500",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/that-dastardly-villian-mg",
    tags: "Electro, Bad, Heavy, Famous Person, MG Sieglar"
  },
  {
    number: 220,
    date: "2009-08-08T04:00:00.000Z",
    title: "I Wrote the Worst Jingle in the World",
    length: "1:02",
    inkey: "C",
    tempo: 96,
    topic: "Song A Day",
    location: "Berkeley",
    instruments: "Vocals, Samples, Synths, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=1ikv048WI7E",
    description: "That's what they're saying, at least.",
    acousticproduced: "Produced",
    mood: "Intense",
    spotify: "https://open.spotify.com/track/3qunbAdXAM9dim4SfT0h4q",
    itunes:
      "https://itunes.apple.com/ph/album/i-wrote-the-worst-jingle-in-the-world/1133055443?i=1133055501",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/i-wrote-the-worst-jingle-in-the-world",
    tags: "Circus, Fun, Dark, Life"
  },
  {
    number: 221,
    date: "2009-08-09T04:00:00.000Z",
    title: "Do It, Screw It",
    length: "1:14",
    inkey: "C#",
    tempo: 117,
    topic: "Poetic",
    location: "Berkeley",
    instruments: "Vocals, Acoustic Guitar",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=NJrFXJmCpg8",
    description:
      "do it oh just do it screw it just go and do it i'll leave it all behind if i could find the kind of conduit through which i could feed",
    acousticproduced: "Acoustic",
    mood: "Chill",
    spotify: "https://open.spotify.com/track/3lkM8RUxFFysSwdPUf4pLz",
    itunes:
      "https://itunes.apple.com/ph/album/do-it-screw-it/1133055443?i=1133055502",
    bandcamp: "https://jonathanmann.bandcamp.com/track/do-it-screw-it",
    tags: "Folk, Motivational "
  },
  {
    number: 222,
    date: "2009-08-10T04:00:00.000Z",
    title: "SkyDiving Through Groupon.com",
    length: "1:52",
    inkey: "G",
    tempo: 120,
    topic: "Commission",
    location: "Berkeley",
    instruments: "Vocals, Synths, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=YfGhZTWgD8g",
    description:
      "Groupon.com is a deal-a-day website. In a few days, they'll be offering a skydiving package at $100 off! Here's a song about it! Awesome.",
    acousticproduced: "Produced",
    mood: "Intense",
    spotify: "https://open.spotify.com/track/1giJpFl8KRqKXzB6RZbeyv",
    itunes:
      "https://itunes.apple.com/ph/album/skydiving-through-groupon-com/1133055443?i=1133055503",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/skydiving-through-groupon-com",
    tags: "Electro, Cheesy, Fun, Company, Groupon"
  },
  {
    number: 223,
    date: "2009-08-11T04:00:00.000Z",
    title: "Courseopedia.com",
    length: "1:14",
    inkey: "F",
    tempo: 95,
    topic: "Commission",
    location: "Berkeley",
    instruments: "Vocals, Synths, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=rbxTCnSAmqc",
    description:
      "courseopedia is a website where you can can enter your zipcode and the kind of college course you want to take and it will find all the relevent courses for you. Awesome!",
    acousticproduced: "Produced",
    mood: "Chill",
    spotify: "https://open.spotify.com/track/5M6rFPdWfWDe3U9MEWl0Wv",
    itunes:
      "https://itunes.apple.com/ph/album/courseopedia-com/1133055443?i=1133055504",
    bandcamp: "https://jonathanmann.bandcamp.com/track/courseopedia-com",
    tags: "Electro, Cheesy, Company, Courseopedia.com"
  },
  {
    number: 224,
    date: "2009-08-12T04:00:00.000Z",
    title: "Bamboo Solutions",
    length: "1:41",
    inkey: "D",
    tempo: 100,
    topic: "Commission",
    location: "Berkeley",
    instruments: "Vocals, Synths, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=hfIFVV3TSzo",
    description:
      'Bamboo Solutions is a company that makes "web parts" for "sharepoint". I don\'t know. But their song is kind of rockin\'! Yeah!',
    acousticproduced: "Produced",
    mood: "Intense",
    spotify: "https://open.spotify.com/track/5yAeZSvdzndVa97fOQnpT4",
    itunes:
      "https://itunes.apple.com/ph/album/bamboo-solutions/1133055443?i=1133055505",
    bandcamp: "https://jonathanmann.bandcamp.com/track/bamboo-solutions",
    tags: "Electro, Cheesy, Company, Internet, Bamboo Solutions"
  },
  {
    number: 225,
    date: "2009-08-13T04:00:00.000Z",
    title: "Man Did What Some Birds Could Never Do",
    length: "1:08",
    inkey: "A",
    tempo: 150,
    topic: "Animals",
    location: "Berkeley",
    instruments: "Vocals, Synths, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=wYSd19nxH8c",
    description: "A song about flight",
    acousticproduced: "Produced",
    mood: "Intense",
    spotify: "https://open.spotify.com/track/0CPu2Lqos2rIEbY1ZAnFAy",
    itunes:
      "https://itunes.apple.com/ph/album/man-did-what-some-birds-could-never-do/1133055443?i=1133055506",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/man-did-what-some-birds-could-never-do",
    tags: "Rock, Hopeful, Fun, Animals, Bird"
  },
  {
    number: 226,
    date: "2009-08-14T04:00:00.000Z",
    title: "Fox News is Bad for the Country",
    length: "2:09",
    inkey: "F",
    tempo: 80,
    topic: "Politics",
    location: "Berkeley",
    instruments: "Vocals, Piano, Samples, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=6ZdUCtBd2mA",
    description: "Pretty self-explanatory.",
    acousticproduced: "Produced",
    mood: "Angry",
    spotify: "https://open.spotify.com/track/2HMeCMvm5em3jY40DR53z0",
    itunes:
      "https://itunes.apple.com/ph/album/fox-news-is-bad-for-the-country/1133055443?i=1133055507",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/fox-news-is-bad-for-the-country",
    tags:
      "Rock, Distortion, Political, TV, Fox News, Famous Person, Glenn Beck, Bill O'Reilly "
  },
  {
    number: 227,
    date: "2009-08-15T04:00:00.000Z",
    title: "InFolinks",
    length: "1:24",
    inkey: "D",
    tempo: 117,
    topic: "Song A Day",
    location: "Berkeley",
    instruments: "Vocals, Piano",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=xNz3xpsUoX4",
    description:
      "I make money online by writing songs. How do you make money online?",
    acousticproduced: "Produced",
    mood: "Intense",
    spotify: "https://open.spotify.com/track/6ODwiOhOSUhuWOD4ofVPlt",
    itunes:
      "https://itunes.apple.com/ph/album/infolinks/1133055443?i=1133055508",
    bandcamp: "https://jonathanmann.bandcamp.com/track/infolinks",
    tags: "Blues, Funny, Fun "
  },
  {
    number: 228,
    date: "2009-08-16T04:00:00.000Z",
    title: "The King of Monkeys, Gnomes and Nacho Cheese",
    length: "0:40",
    inkey: "E",
    tempo: 65,
    topic: "Nerd",
    location: "Vermont",
    instruments: "Vocals, Synths, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=DqqeLoWxmYM",
    description:
      "Someone asked for a song about their friend who is known for three things: Monkeys, Gnomes and Nacho Cheese. Here it is.",
    acousticproduced: "Produced",
    mood: "Chill",
    spotify: "https://open.spotify.com/track/3x18ePTFNPtjiGEFDBmtyq",
    itunes:
      "https://itunes.apple.com/ph/album/the-king-of-monkeys-gnomes-and-nacho-cheese/1133055443?i=1133055509",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/the-king-of-monkeys-gnomes-and-nacho-cheese",
    tags: "Electro, Fun, Wistful, Animals, Monkeys, Gnomes, Food, Nacho Cheese"
  },
  {
    number: 229,
    date: "2009-08-17T04:00:00.000Z",
    title: "What Are You So Angry About?",
    length: "1:49",
    inkey: "D",
    tempo: 84,
    topic: "Politics",
    location: "Vermont",
    instruments: "Vocals, Piano, Acoustic Guitar, Samples",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=g-LTwDqUJ4c",
    description:
      "A song about the current health insurance boondoggle. The insurance industry is just too powerful, they couldn't let things change. They've done some really intense lobbying and managed to derail the whole thing. Damn.",
    acousticproduced: "Produced",
    mood: "Confused",
    spotify: "https://open.spotify.com/track/5giNpGIi8SUVOf5j7KTEow",
    itunes:
      "https://itunes.apple.com/ph/album/what-are-you-so-angry-about/1133055443?i=1133055510",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/what-are-you-so-angry-about",
    tags: "Folk, Political, Health Care"
  },
  {
    number: 230,
    date: "2009-08-18T04:00:00.000Z",
    title: "Please Vote for Me",
    length: "0:53",
    inkey: "F",
    tempo: 129,
    topic: "Life",
    location: "Vermont",
    instruments: "Vocals, Acoustic Guitar",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=_s-gegtqBEU",
    description:
      "I posted this Cha Cha video a few weeks ago! I've been chosen as one of 5 finalists...out of 70 videos! Yay! You can vote once every 24 hours! Please do. And get your friends to vote, too! I'm way behind at this point!",
    acousticproduced: "Acoustic",
    mood: "Intense",
    spotify: "https://open.spotify.com/track/2Sou0W7KnpkHp84wyZ2vSC",
    itunes:
      "https://itunes.apple.com/ph/album/please-vote-for-me/1133055443?i=1133055511",
    bandcamp: "https://jonathanmann.bandcamp.com/track/please-vote-for-me",
    tags: "Folk, Personal, Funny, Plea, Frustrated"
  },
  {
    number: 231,
    date: "2009-08-19T04:00:00.000Z",
    title: "Tiki the Puppy",
    length: "0:40",
    inkey: "C",
    tempo: 109,
    topic: "Animals",
    location: "Vermont",
    instruments: "Vocals, Synths, Drum Machine",
    beard: "N/A",
    videoid: "https://www.youtube.com/watch?v=M0FSneMDbSU",
    description: "About my parent's cute puppy, dog Tiki. Yay!",
    acousticproduced: "Produced",
    mood: "Chill",
    spotify: "https://open.spotify.com/track/6p30ApycALLw8kPnLwOMdA",
    itunes:
      "https://itunes.apple.com/ph/album/tiki-the-puppy/1133055443?i=1133055512",
    bandcamp: "https://jonathanmann.bandcamp.com/track/tiki-the-puppy",
    tags: "Electro, Cheesy, Fun, Dogs, Tiki"
  },
  {
    number: 232,
    date: "2009-08-20T04:00:00.000Z",
    title: "Funny Hat",
    length: "0:57",
    inkey: "F",
    tempo: 120,
    topic: "Object",
    location: "Vermont",
    instruments: "Vocals, Synths, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=Dmz4NhmbMdQ",
    description: "My grandma's funny hat!",
    acousticproduced: "Produced",
    mood: "Intense",
    spotify: "https://open.spotify.com/track/2RP9soezN4GPVOHFdmrEQH",
    itunes:
      "https://itunes.apple.com/ph/album/funny-hat/1133055443?i=1133055513",
    bandcamp: "https://jonathanmann.bandcamp.com/track/funny-hat",
    tags: "Electro, Funny, Fun, Grandma, Hat"
  },
  {
    number: 233,
    date: "2009-08-21T04:00:00.000Z",
    title: "Pop Music",
    length: "2:25",
    inkey: "G",
    tempo: 106,
    topic: "Poetic",
    location: "Vermont ",
    instruments: "Vocals, Baritone Uke",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=vKszq7olUIo",
    description: "Pop music in the shower on a baritone uke.",
    acousticproduced: "Acoustic",
    mood: "Chill",
    spotify: "https://open.spotify.com/track/4lfUUoyHp53PMkAnv9OWTO",
    itunes:
      "https://itunes.apple.com/ph/album/pop-music/1133055443?i=1133055514",
    bandcamp: "https://jonathanmann.bandcamp.com/track/pop-music",
    tags: "Folk, Delicate, Silly, Light"
  },
  {
    number: 234,
    date: "2009-08-22T04:00:00.000Z",
    title: "Happy Anniversary the Cat Has Kidney Failure",
    length: "2:20",
    inkey: "F#",
    tempo: 148,
    topic: "Life",
    location: "Vermont",
    instruments: "Vocals, Baritone Uke",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=8Eg-uwlephE",
    description:
      "On my brother and his wife's wedding anniversary, they found out that their cat had kidney failure.",
    acousticproduced: "Acoustic",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/0PGtlJsrsdBnzafyCEed4n",
    itunes:
      "https://itunes.apple.com/ph/album/happy-anniversary-the-cat-has-kidney-failure/1133055443?i=1133055515",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/happy-anniversary-the-cat-has-kidney-failure",
    tags: "Folk, Funny, Fun, Animals, Cat"
  },
  {
    number: 235,
    date: "2009-08-23T04:00:00.000Z",
    title: "I am Just a Shadow",
    length: "1:16",
    inkey: "D#",
    tempo: 113,
    topic: "Poetic",
    location: "Vermont",
    instruments: "Vocals, Baritone Uke",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=vLizXeF8RIs",
    description: "I am just a shadow you can't see me",
    acousticproduced: "Acoustic",
    mood: "Intense",
    spotify: "https://open.spotify.com/track/3tbQLYBQbaNDQoc5VD6T7M",
    itunes:
      "https://itunes.apple.com/ph/album/i-am-just-a-shadow/1133055443?i=1133055516",
    bandcamp: "https://jonathanmann.bandcamp.com/track/i-am-just-a-shadow",
    tags: "Folk, Dark, Looming"
  },
  {
    number: 236,
    date: "2009-08-24T04:00:00.000Z",
    title: "Lucky",
    length: "1:47",
    inkey: "D",
    tempo: 100,
    topic: "Love",
    location: "Vermont",
    instruments: "Vocals, Baritone Uke",
    beard: "Clean",
    videoid: "https://youtu.be/UxqG1HV34ag",
    description: "I am just a shadow you can't see me",
    acousticproduced: "Acoustic",
    mood: "Pensive",
    spotify: "https://open.spotify.com/track/5NroaXvVytJgubZWn9ljNG",
    itunes: "https://itunes.apple.com/ph/album/lucky/1133055443?i=1133055517",
    bandcamp: "https://jonathanmann.bandcamp.com/track/lucky",
    tags: "Folk, Delicate, Wistful, Love"
  },
  {
    number: 237,
    date: "2009-08-25T04:00:00.000Z",
    title: "Epuls.pl Anthem",
    length: "1:39",
    inkey: "A#",
    tempo: 145,
    topic: "Commission",
    location: "Berkeley ",
    instruments: "Vocals, Synths, Drum Machine",
    beard: "Shadow",
    videoid: "https://youtu.be/wzbka8mwQYI",
    description: "A song about being lucky",
    acousticproduced: "Produced",
    mood: "Tired",
    spotify: "https://open.spotify.com/track/0hHS1s6IX7iz7MzRorIP4K",
    itunes:
      "https://itunes.apple.com/ph/album/epuls-pl-anthem/1133055443?i=1133055518",
    bandcamp: "https://jonathanmann.bandcamp.com/track/epuls-pl-anthem",
    tags: "Electro, Cheesy, Dark, Silly"
  },
  {
    number: 238,
    date: "2009-08-26T04:00:00.000Z",
    title: "GPS With Bob Dylan",
    length: "2:10",
    inkey: "G",
    tempo: 90,
    topic: "Nerd",
    location: "Berkeley ",
    instruments: "Vocals, Piano, Samples, Drum Machine",
    beard: "Shadow",
    videoid: "https://youtu.be/QWNAUAFb3Ik",
    description: "A song about Poland's most popular social network!",
    acousticproduced: "Produced",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/5LU3HO5kF9ebN3YfAE9yla",
    itunes:
      "https://itunes.apple.com/ph/album/gps-voiced-by-bob-dylan/1133055443?i=1133055519",
    bandcamp: "https://jonathanmann.bandcamp.com/track/gps-with-bob-dylan",
    tags: "Rock, Fun, Silly, Funny, Famous Person, Bob Dylan"
  },
  {
    number: 239,
    date: "2009-08-27T04:00:00.000Z",
    title: "I Don't Want to Compete",
    length: "1:39",
    inkey: "D",
    tempo: 110,
    topic: "Poetic",
    location: "Berkeley ",
    instruments: "Vocals, Synths, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=ixlPXLHpQe4",
    description:
      "What if Bob Dylan was the voice of your GPS unit? It may sound a little something like this...",
    acousticproduced: "Produced",
    mood: "Sad",
    spotify: "https://open.spotify.com/track/49mPQAOm65KRYEoqFCY6zv",
    itunes:
      "https://itunes.apple.com/ph/album/i-dont-want-to-compete/1133055443?i=1133055520",
    bandcamp: "https://jonathanmann.bandcamp.com/track/i-dont-want-to-compete",
    tags: "Electro, Frustrated"
  },
  {
    number: 240,
    date: "2009-08-28T04:00:00.000Z",
    title: "TIRED",
    length: "0:40",
    inkey: "F#",
    tempo: 82,
    topic: "Song A Day",
    location: "Berkeley ",
    instruments: "Vocals, Baritone Uke",
    beard: "Shadow",
    videoid: "https://youtu.be/JZY3gPmpgPY",
    description: "A song about how I've never really liked competition.",
    acousticproduced: "Acoustic",
    mood: "Tired",
    spotify: "https://open.spotify.com/track/0M30evngfRujH4IrRlPmpR",
    itunes: "https://itunes.apple.com/ph/album/tired/1133055443?i=1133055521",
    bandcamp: "https://jonathanmann.bandcamp.com/track/tired",
    tags: "Folk, Fun, Silly"
  },
  {
    number: 241,
    date: "2009-08-29T04:00:00.000Z",
    title: "Goodbye JewFro, Hello Cleanface",
    length: "0:36",
    inkey: "G",
    tempo: 130,
    topic: "Life",
    location: "Berkeley ",
    instruments: "Vocals, Synths, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=do4n1e_1jOY",
    description: "goodbye jew fro hello clean face",
    acousticproduced: "Produced",
    mood: "Excited",
    spotify: "https://open.spotify.com/track/0W7gyrpGlMVj36CbySHI1m",
    itunes:
      "https://itunes.apple.com/ph/album/goodbye-jewfro-hello-cleanface/1133055443?i=1133055522",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/goodbye-jewfro-hello-cleanface",
    tags: "Electro, Light, Fun, My Appearence"
  },
  {
    number: 242,
    date: "2009-08-30T04:00:00.000Z",
    title: "This is How We Do It at Bennington",
    length: "1:15",
    inkey: "C",
    tempo: 80,
    topic: "Commission",
    location: "Berkeley ",
    instruments: "Vocals, Synths, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=FgcDtphKZEs",
    description:
      "A song request from some folks at my alma mater! Emmet is a bodybuilder and Keenan tall, lanky",
    acousticproduced: "Produced",
    mood: "Chill",
    spotify: "https://open.spotify.com/track/7kTffcRvDaoJxVdUsySQHA",
    itunes:
      "https://itunes.apple.com/ph/album/this-is-how-we-do-it-at-bennington/1133055443?i=1133055523",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/this-is-how-we-do-it-at-bennington",
    tags: "Electro, Light, Fun, Silly, Place, Bennington"
  },
  {
    number: 243,
    date: "2009-08-31T04:00:00.000Z",
    title: "I Got a New Guitar",
    length: "1:27",
    inkey: "E",
    tempo: 108,
    topic: "Object",
    location: "Berkeley ",
    instruments: "Vocals, Electric Guitar, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=ujWJDnOlGJQ",
    description:
      "I got a new guitar today, so I decided to write a song about it. I got it from Subway Guitars in Berkeley, an awesome little guitar shop. The proprietor, an eccentric Berkeley personality named Fat Dawg, has been in the guitar making/selling/trading business since the 70's. He's great. He made me this guitar. It's awesome. i got a new guitar it's silver and it's black i'm gonna play it all the time when i write my songs it'll take me far it's got a wide neck the sound is just so sublime you know that i can't go wrong i got a new guitar it is one of a kind it was made for me by a man called fat dawg i wanna be a a star i wonder if i'm past my prime but i don't know what else to be i'm just me a song hog",
    acousticproduced: "Produced",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/2p3n9tune252Qt0KbuZJZe",
    itunes:
      "https://itunes.apple.com/ph/album/i-got-a-new-guitar/1133055443?i=1133055524",
    bandcamp: "https://jonathanmann.bandcamp.com/track/i-got-a-new-guitar",
    tags: "Rock, Silly, Dark"
  },
  {
    number: 244,
    date: "2009-09-01T04:00:00.000Z",
    title: "No Judgements",
    length: "1:54",
    inkey: "D",
    tempo: 105,
    topic: "Contest",
    location: "Berkeley ",
    instruments: "Vocals, Piano, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=EVQmcMmd_8Q",
    description:
      "A song for another competition. I'm going to make the video tomorrow.",
    acousticproduced: "Produced",
    mood: "Chill",
    spotify: "https://open.spotify.com/track/1KVBYioPcujdeRLF9UpbUZ",
    itunes:
      "https://itunes.apple.com/ph/album/no-judgements/1133055443?i=1133055525",
    bandcamp: "https://jonathanmann.bandcamp.com/track/no-judgements",
    tags: "Rock, Cheesy, Wistful "
  },
  {
    number: 245,
    date: "2009-09-02T04:00:00.000Z",
    title: "Cisco Telepresence Anthem",
    length: "0:53",
    inkey: "F",
    tempo: 125,
    topic: "Contest",
    location: "Berkeley ",
    instruments: "Vocals, Synths, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=qj2hZXbPBkc",
    description: "N/A",
    acousticproduced: "Produced",
    mood: "Intense",
    spotify: "https://open.spotify.com/track/753xJ106RQ2c2nd4DJr55i",
    itunes:
      "https://itunes.apple.com/ph/album/cisco-telepresence-anthem/1133055443?i=1133055526",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/cisco-telepresence-anthem",
    tags: "Rock, Light, Catchy"
  },
  {
    number: 246,
    date: "2009-09-03T04:00:00.000Z",
    title: "No Judgements v2",
    length: "1:34",
    inkey: "C",
    tempo: 90,
    topic: "Contest",
    location: "Berkeley ",
    instruments: "Vocals, Synths, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=1hkJRjCm824",
    description:
      "Another attempt at the No Judgements concept. Which is better? (both videos are placeholders)",
    acousticproduced: "Produced",
    mood: "Pensive",
    spotify: "https://open.spotify.com/track/4FR3DAnVECpytquBou3kmU",
    itunes:
      "https://itunes.apple.com/ph/album/no-judgements-vol-2/1133055443?i=1133055527",
    bandcamp: "https://jonathanmann.bandcamp.com/track/no-judgements-v2",
    tags: "Electro, Cheesy"
  },
  {
    number: 247,
    date: "2009-09-04T04:00:00.000Z",
    title: "Sometimes It's Hard to Keep Yourself Moving",
    length: "3:14",
    inkey: "B",
    tempo: 110,
    topic: "Poetic ",
    location: "Berkeley ",
    instruments: "Vocals, Synths, Samples, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=6ldrFuDqcLM",
    description: "A song for songfight.org. Sing it! I just couldn't dance",
    acousticproduced: "Produced",
    mood: "Sad",
    spotify: "https://open.spotify.com/track/4VI3AHkEfa4oEE3z4y4jvj",
    itunes:
      "https://itunes.apple.com/ph/album/sometimes-its-hard-to-keep-yourself-moving/1133055443?i=1133055528",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/sometimes-its-hard-to-keep-yourself-moving",
    tags: "Electro, Frustrated, Dark, Wistful"
  },
  {
    number: 248,
    date: "2009-09-05T04:00:00.000Z",
    title: "Heart Overflowing",
    length: "2:46",
    inkey: "F",
    tempo: 110,
    topic: "Love",
    location: "Berkeley ",
    instruments: "Vocals, Synths, Samples, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=H4tY515V83Y",
    description:
      "she wears the kind of mystery you read about in books she can make my spine electric with the most casual of looks she is open",
    acousticproduced: "Produced",
    mood: "Happy",
    spotify: "https://open.spotify.com/track/0yWA0rWXqiywnqV3ThdGEt",
    itunes:
      "https://itunes.apple.com/ph/album/heart-overflowing/1133055443?i=1133055529",
    bandcamp: "https://jonathanmann.bandcamp.com/track/heart-overflowing",
    tags: "Rock, Wistful, Catchy"
  },
  {
    number: 249,
    date: "2009-09-06T04:00:00.000Z",
    title: "Bicycle Blvd",
    length: "1:49",
    inkey: "D",
    tempo: 137,
    topic: "Nerd",
    location: "Berkeley ",
    instruments: "Vocals, Electric Guitar, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=jnWcXes5pYg",
    description:
      "the air is so much cleaner the grass is so much greener the people much less meaner on bicycle blvd. the street is much less scary the bikes are way less wary the people are more hairy on bicycle blvd. i wanna be where the bikes roam free i wanna reside where the folks are always riding so unencumbered when the cars are outnumbered on the lungs are so much stronger the days are always longer the ping is so much ponger on bicycle blvd. the weather's always better you never need a sweater you can always go and get her on on bicycle blvd can't you hear those bike bells ringing can you hear those breaks a squealing hear those those voices singing the faces are so happy commute is so more snappy and 100 times less crappy on bicycle blvd you'll feel like a winner if your a pro or a beginner and you just might get thinner on bicyle blvd",
    acousticproduced: "Produced",
    mood: "Happy",
    spotify: "https://open.spotify.com/track/3Ampu9Yr4OqQA78RCRAn8Q",
    itunes:
      "https://itunes.apple.com/ph/album/bicycle-blvd/1133055443?i=1133055530",
    bandcamp: "https://jonathanmann.bandcamp.com/track/bicycle-blvd",
    tags: "Rock, Fun, Catchy, Good, Bike"
  },
  {
    number: 250,
    date: "2009-09-07T04:00:00.000Z",
    title: "At the Harley Davidson Museum",
    length: "1:13",
    inkey: "E",
    tempo: 138,
    topic: "Contest",
    location: "Berkeley ",
    instruments: "Vocals, Electric Guitar, Samples, Drum Machine",
    beard: "N/A",
    videoid: "https://www.youtube.com/watch?v=sts6uK6x_m8",
    description: "Another contest!",
    acousticproduced: "Produced",
    mood: "Intense",
    spotify: "https://open.spotify.com/track/1Fp9vrKhWU3hdbDTtAKh6q",
    itunes:
      "https://itunes.apple.com/ph/album/at-the-harley-davidson-museum/1133055443?i=1133055531",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/at-the-harley-davidson-museum",
    tags: "Blues, Fun, Cheesy "
  },
  {
    number: 251,
    date: "2009-09-08T04:00:00.000Z",
    title: "Truth in Advertising",
    length: "1:01",
    inkey: "A",
    tempo: 130,
    topic: "Contest",
    location: "Berkeley ",
    instruments: "Vocals, Piano, Samples, Drum Machine",
    beard: "N/A",
    videoid: "https://www.youtube.com/watch?v=WwcUafltTf8",
    description:
      "This is part of a video for a contest about truth in beauty product advertising. Starring Ivory!",
    acousticproduced: "Produced",
    mood: "Intense",
    spotify: "https://open.spotify.com/track/0vyBbe7Jj4rtcEaYQrUZJU",
    itunes:
      "https://itunes.apple.com/ph/album/truth-in-advertising/1133055443?i=1133055532",
    bandcamp: "https://jonathanmann.bandcamp.com/track/truth-in-advertising",
    tags: "Rock, Fun, Educational, PSA, Ivory"
  },
  {
    number: 252,
    date: "2009-09-09T04:00:00.000Z",
    title: "I've Got Another Cold",
    length: "0:10",
    inkey: "G",
    tempo: 120,
    topic: "Sick",
    location: "Berkeley ",
    instruments: "Vocals, Synths, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=I6Rtu2NDz44",
    description: "ugh",
    acousticproduced: "Produced",
    mood: "Tired",
    spotify: "https://open.spotify.com/track/5wLbeSobgcyQnUk3AYPr0S",
    itunes:
      "https://itunes.apple.com/ph/album/ive-got-another-cold/1133055443?i=1133055533",
    bandcamp: "https://jonathanmann.bandcamp.com/track/ive-got-another-cold",
    tags: "Rock, Fun, Silly"
  },
  {
    number: 253,
    date: "2009-09-10T04:00:00.000Z",
    title: "Still Sick",
    length: "0:18",
    inkey: "C",
    tempo: 75,
    topic: "Sick",
    location: "Berkeley ",
    instruments: "Vocals, Piano, Synths, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=MkIFPdF7vng",
    description: "shoot",
    acousticproduced: "Produced",
    mood: "Tired",
    spotify: "https://open.spotify.com/track/0i4a5xHRYttnKcdTvkpGkK",
    itunes:
      "https://itunes.apple.com/ph/album/still-sick/1133055443?i=1133055534",
    bandcamp: "https://jonathanmann.bandcamp.com/track/still-sick",
    tags: "Electro, Fun, Silly"
  },
  {
    number: 254,
    date: "2009-09-11T04:00:00.000Z",
    title: "I'm a Bit Better",
    length: "1:05",
    inkey: "C",
    tempo: 120,
    topic: "Sick",
    location: "Berkeley ",
    instruments: "Vocals, Synths, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=GEk2Bkbkn4A",
    description: "Yay!",
    acousticproduced: "Produced",
    mood: "Tired",
    spotify: "https://open.spotify.com/track/2ONX4kbwX6Tn8xlBvkCbco",
    itunes:
      "https://itunes.apple.com/ph/album/im-a-bit-better/1133055443?i=1133055535",
    bandcamp: "https://jonathanmann.bandcamp.com/track/im-a-bit-better",
    tags: "Electro, Fun, Silly, Light"
  },
  {
    number: 255,
    date: "2009-09-12T04:00:00.000Z",
    title: "We Built a Fort",
    length: "0:20",
    inkey: "C",
    tempo: 165,
    topic: "Friend",
    location: "Berkeley ",
    instruments: "Vocals, Piano, Synths, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=-Scd_JZq2jk",
    description: "And it was fun",
    acousticproduced: "Produced",
    mood: "Tired",
    spotify: "https://open.spotify.com/track/2MI5lQIcWYUunOie8uz75u",
    itunes:
      "https://itunes.apple.com/ph/album/we-built-a-fort/1133055443?i=1133055536",
    bandcamp: "https://jonathanmann.bandcamp.com/track/we-built-a-fort",
    tags: "Electro, Fun, Silly"
  },
  {
    number: 256,
    date: "2009-09-13T04:00:00.000Z",
    title: "I'm Jonathan",
    length: "1:56",
    inkey: "D#",
    tempo: 88,
    topic: "Life",
    location: "Berkeley ",
    instruments: "Vocals",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=BebDpLN-lRg",
    description: "In the car, rappin' about LIFE, man.",
    acousticproduced: "Acoustic",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/1LttlXmEpl6PWL21pl58FL",
    itunes:
      "https://itunes.apple.com/ph/album/im-jonathan/1133055443?i=1133055537",
    bandcamp: "https://jonathanmann.bandcamp.com/track/im-jonathan",
    tags: "Acapella, Silly, Dark"
  },
  {
    number: 257,
    date: "2009-09-14T04:00:00.000Z",
    title: "First There Was No Chair",
    length: "1:05",
    inkey: "D",
    tempo: 107,
    topic: "Object",
    location: "Berkeley ",
    instruments: "Vocals, Synths, Drum Machine",
    beard: "N/A",
    videoid: "https://www.youtube.com/watch?v=bJf5ZgsV5Fw",
    description: "Then there was a chair.",
    acousticproduced: "Produced",
    mood: "Intense",
    spotify: "https://open.spotify.com/track/6fheUVlQVISIDHD26rYlrY",
    itunes:
      "https://itunes.apple.com/ph/album/first-there-was-no-chair/1133055443?i=1133055538",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/first-there-was-no-chair",
    tags: "Electro, Distortion, Dark, Heavy"
  },
  {
    number: 258,
    date: "2009-09-15T04:00:00.000Z",
    title: "Mirror Revolt",
    length: "2:12",
    inkey: "C",
    tempo: 110,
    topic: "Object",
    location: "Berkeley ",
    instruments: "Vocals, Synths, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=ykmpoBCnUQE",
    description:
      "mirror mirror on the wall you look sadder than the last time i saw you",
    acousticproduced: "Produced",
    mood: "Intense",
    spotify: "https://open.spotify.com/track/48U3drykYAvBR0U0RqMfTd",
    itunes:
      "https://itunes.apple.com/ph/album/mirror-revolt/1133055443?i=1133055539",
    bandcamp: "https://jonathanmann.bandcamp.com/track/mirror-revolt",
    tags: "Electro, Dark, Narrative "
  },
  {
    number: 259,
    date: "2009-09-16T04:00:00.000Z",
    title: "Simian Space Flight",
    length: "3:27",
    inkey: "D",
    tempo: 80,
    topic: "Instrumental",
    location: "Berkeley ",
    instruments: "Synths, Drum Machine",
    beard: "N/A",
    videoid: "https://www.youtube.com/watch?v=hMIRkgop65s",
    description:
      "This is actually the very first song a day instrumental! With footage from the Prelinger Archive.",
    acousticproduced: "Produced",
    mood: "Chill",
    spotify: "https://open.spotify.com/track/56JQlAvZdBxEXfQNxc6MGw",
    itunes:
      "https://itunes.apple.com/ph/album/simian-space-flight/1133055443?i=1133055540",
    bandcamp: "https://jonathanmann.bandcamp.com/track/simian-space-flight",
    tags: "Electro, Dark, Dreamy"
  },
  {
    number: 260,
    date: "2009-09-17T04:00:00.000Z",
    title: "Link Mann",
    length: "3:07",
    inkey: "D",
    tempo: 76,
    topic: "Video Games",
    location: "Berkeley ",
    instruments: "Vocals, Synths, Samples, Drum Machine",
    beard: "N/A",
    videoid: "https://www.youtube.com/watch?v=ouiE50FVIMc",
    description:
      "i dreamt that i was link i was lying in a field i was thinking about zelda and how to buy a better sheild i was sad because i didn't have a pillow and in the morning it was dungeon time some kind of weeping willow well the octoroks and the stalfos and the like likes and the dodongos they all started dancing they all started making noise and i knew this style of dancing was like a poison so i grabbed my torch and i lit up a fire and that's when i heard the fairy choir they were singing: zelda needs you in the castle we all need you to save hyrule we'll surround you with our hearts love love love love love love love well it was beautiful and it was amazing and needless to say i could deal with this cave thing so morning time came and the path was clear i stepped into the cave and everything disappeared i was lying in my bed sunlight shining through i was thinking about zelda i was thinking about you i got to thinking about the field where in my dream i lay it's existed in my memory as a place i used to play and it's good to remember can be a useful tool especially when it ends you up down in hyrule with the fairies",
    acousticproduced: "Produced",
    mood: "Intense",
    spotify: "https://open.spotify.com/track/6Ckp5d02YLVlVAJRuIIvVc",
    itunes:
      "https://itunes.apple.com/ph/album/link-mann/1133055443?i=1133055541",
    bandcamp: "https://jonathanmann.bandcamp.com/track/link-mann",
    tags: "Rock, Wistful, Dreamy, Video Games, NES, Zelda"
  },
  {
    number: 261,
    date: "2009-09-18T04:00:00.000Z",
    title: "The Android Who Didn't Have a Penis",
    length: "3:37",
    inkey: "C",
    tempo: 110,
    topic: "Sex",
    location: "Berkeley ",
    instruments: "Vocals, Piano, Samples, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=nSru178teSY",
    description:
      "this is a song about an android who is completely human in every way, except that his creators didn't see fit to give him a penis, or any other mode of sexual expression. As he grew older, it became more and more of a problem, until all he can think about is having sex. Ultimately, not having that outlet, he turns against his human creators, with all the years of pent up sexual frustration coming out in a fury of violence. It's a cautionary tale, to be sure. i was given a soul endowed with consciousness i can pass a turing test with flying colors it's true i'm a machine you wouldn't know unless we fell in love and go to bed i have no genitals why give me libido without the parts to back it up i know just what i crave but i am just a slave to the lust that's running through my pipes i'll rust if i don't do it tonight I feel the burn in every electric node if i don't let it out soon, i will explode i have precision coordination and i can calculate one hundred trillion processes in under a millesecond I can tear a man in two and believe me, it's crossed my mind for lack of a penis i blame all of human kind why give me libido without the parts to back it up i know just what i crave but i'm a slave to the lust that's running through my pipes i'll rust if i don't do it tonight I feel the burn in every electric node if i don't let it out soon, i will explode i wanna fuck human or truck i wanna feel flesh a burning wanna be a fucking machine instead i'm devoted to higher learning i got an itch sonofabitch if i can't find a way to scratch it if i could build a mechanical dildo maybe i could somehow attach it on you gave me everything i needed to make my way through this world but the one thing that i wanted you withheld like a jerk so now i will destroy you will all the pent up rage fed by a lustful heart that you locked inside this cage",
    acousticproduced: "Produced",
    mood: "Sad",
    spotify: "https://open.spotify.com/track/76Wa4SmqiwBWeb5sqvJMnW",
    itunes:
      "https://itunes.apple.com/ph/album/the-android-who-didnt-have-a-penis/1133055443?i=1133055542",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/the-android-who-didnt-have-a-penis",
    tags: "Rock, Light, Android"
  },
  {
    number: 262,
    date: "2009-09-19T04:00:00.000Z",
    title: "You Can Do It, Sam",
    length: "1:35",
    inkey: "C",
    tempo: 150,
    topic: "Friend",
    location: "Berkeley ",
    instruments: "Vocals, Synths, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=o-OHmBtcH1k",
    description: "A song for my good friend SAm, who is quitting smoking.",
    acousticproduced: "Produced",
    mood: "Excited",
    spotify: "https://open.spotify.com/track/6vmlwVVm64MxADdNTMvXVy",
    itunes:
      "https://itunes.apple.com/ph/album/you-can-do-it-sam/1133055443?i=1133055543",
    bandcamp: "https://jonathanmann.bandcamp.com/track/you-can-do-it-sam",
    tags: "Electro, Distortion, Dreamy, Motivational"
  },
  {
    number: 263,
    date: "2009-09-20T04:00:00.000Z",
    title: "The Sex Machine That Couldn't Love",
    length: "2:02",
    inkey: "A",
    tempo: 117,
    topic: "Sex",
    location: "Berkeley ",
    instruments: "Vocals, Synths, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=3PlhMnSlk-w",
    description:
      "i was a sex machine back in the forties i was the first of my kind",
    acousticproduced: "Produced",
    mood: "Sad",
    spotify: "https://open.spotify.com/track/1ahdoc9lR4XHI8zEy5ok5S",
    itunes:
      "https://itunes.apple.com/ph/album/the-sex-machine-that-couldnt-love/1133055443?i=1133055544",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/the-sex-machine-that-couldnt-love",
    tags: "Electro, Vocoder, Dreamy, Dark"
  },
  {
    number: 264,
    date: "2009-09-21T04:00:00.000Z",
    title: "The Robot That Lived on the Moon and Wished It Were Human",
    length: "2:28",
    inkey: "G",
    tempo: 110,
    topic: "Nerd",
    location: "Berkeley ",
    instruments: "Vocals, Synths, Drum Machine",
    beard: "N/A",
    videoid: "https://www.youtube.com/watch?v=XDJTTRhIrSc",
    description:
      "Title says it all! See if you can make out the lyrics for yourself.",
    acousticproduced: "Produced",
    mood: "Pensive",
    spotify: "https://open.spotify.com/track/0PZ9tdZfh1jm37esVbq9jF",
    itunes:
      "https://itunes.apple.com/ph/album/the-robot-that-lived-on-the-moon-and-wished-it-were-human/1133055443?i=1133055545",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/the-robot-that-lived-on-the-moon-and-wished-it-were-human",
    tags: "Electro, Vocoder, Dreamy, Dark"
  },
  {
    number: 265,
    date: "2009-09-22T04:00:00.000Z",
    title:
      "Quantum Decoupling Transition in a One-Dimensional \nFeschbach Resonant Super Fluid",
    length: "2:46",
    inkey: "Bb",
    tempo: 130,
    topic: "Science",
    location: "Berkeley ",
    instruments: "Vocals, Synths, Samples, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=FIXRXMMlZBM",
    description:
      'http://jonathanmann.bandcamp.com/trac... I was listening to the RadioLab podcast this morning (if you don\'t know RadioLab, you should (http://blogs.wnyc.org/radiolab/), and they had They Might Be Giants on. They Might Be Giants just released their 14th album, a kids album called "Here Comes Science". It\'s great! Anyway. During this podcast, they challenged They Might Be Giants to make a song up on the spot using the phrase, "Quantum decoupling transition in a one-dimensional Feshbach-resonant superfluid". Being They Might Be Giants, they did a great job. I decided to pick up where they left off though, and use today\'s song a day song to write the full song. The lyrics come from an abstract that Sheey DE and Radzihovsky L. wrote on the subject in Sep. of 2005. I have NO idea what any of it means. I changed only one word...leaving out "Luttinger", because I couldn\'t figure out how to say it. Yay! We study a one-dimensional gas of fermionic atoms interacting via an s-wave molecular Feshbach resonance. At low energies the system is characterized by two Josephson-coupled Luttinger liquids, corresponding to paired atomic and molecular superfluids. We show that, in contrast to higher dimensions, the system exhibits a quantum phase transition from a phase in which the two superfluids are locked together to one in which, at low energies, quantum fluctuations suppress the Feshbach resonance (Josephson) coupling, effectively decoupling the molecular and atomic superfluids. Experimental signatures of this quantum transition include the appearance of an out-of-phase gapless mode (in addition to the standard gapless in-phase mode) in the spectrum of the decoupled superfluid phase and a discontinuous change in the molecular momentum distribution function.',
    acousticproduced: "Produced",
    mood: "Intense",
    spotify: "https://open.spotify.com/track/5dNfGkpYiGE5j9zJJbdXtB",
    itunes:
      "https://itunes.apple.com/ph/album/in-heaven/1133055443?i=1133055546",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/quantum-decoupling-transition-in-a-one-dimensional-feschbach-resonant-super-fluid",
    tags: "Rock, Dark, Wistful, Educational, Songify, Scientific Paper"
  },
  {
    number: 266,
    date: "2009-09-23T04:00:00.000Z",
    title: "In Heaven",
    length: "3:07",
    inkey: "A",
    tempo: 110,
    topic: "Poetic",
    location: "Berkeley ",
    instruments: "Vocals, Synths, Drum Machine",
    beard: "N/A",
    videoid: "https://www.youtube.com/watch?v=33Z5uAyPF8g",
    description:
      "don't turn away from the light in the sky it might be god, he might be wearing a tie and you'll stop and ask him for directions or he'll light your cigarette for you he's by himself or hiding in a group in your lover's pants or in a fly in your soup his cufflinks jingle when he struts he'll let you in even if he hates your guts no need to be afraid of dying if it's love you want but you can't face it without trying we all want love his suit fits him poorly his pants are too tight he'll come looking for you in the still of the night at the foot of your bed his beard tickles your toes he'll take you away to where nobody goes",
    acousticproduced: "Produced",
    mood: "Intense",
    spotify: "https://open.spotify.com/track/38OEidXYRIWdDKRWsYACLn",
    itunes:
      "https://itunes.apple.com/ph/album/the-three-rules-of-the-internet/1133055443?i=1133055547",
    bandcamp: "https://jonathanmann.bandcamp.com/track/in-heaven",
    tags: "Rock, Dark, Heavy, Distortion"
  },
  {
    number: 267,
    date: "2009-09-24T04:00:00.000Z",
    title: "The Three Rules of the internet",
    length: "1:04",
    inkey: "C",
    tempo: 100,
    topic: "Internet",
    location: "Berkeley ",
    instruments: "Vocals, Synths, Samples, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=HS9BlNSCmw8",
    description: "Count 'em...1, 2, 3!",
    acousticproduced: "Produced",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/4y56ts5l9wZMZCmeqSmd75",
    itunes:
      "https://itunes.apple.com/ph/album/scary-ant-link-creature/1133055443?i=1133055548",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/the-3-rules-of-the-internet-reprise",
    tags: "Folk,Funny, Nerd, Redux"
  },
  {
    number: 268,
    date: "2009-09-25T04:00:00.000Z",
    title: "Death in Every instant",
    length: "1:00",
    inkey: "G",
    tempo: 90,
    topic: "Grandma\n",
    location: "Berkeley ",
    instruments: "Vocals, Samples",
    beard: "N/A",
    videoid: "https://www.youtube.com/watch?v=woCjVts5-Ug",
    description: "A poem my grandmother wrote.",
    acousticproduced: "Produced",
    mood: "Chill",
    spotify: "https://open.spotify.com/track/5PXzqd1lnoTq7fHSjCToOw",
    itunes:
      "https://itunes.apple.com/ph/album/death-in-every-instant/1133055443?i=1133055549",
    bandcamp: "https://jonathanmann.bandcamp.com/track/scary-any-like-creature",
    tags: "Spoken word, Wistful, Delicate"
  },
  {
    number: 269,
    date: "2009-09-26T04:00:00.000Z",
    title: "Scary Hill",
    length: "2:34",
    inkey: "E",
    tempo: 120,
    topic: "Childhood",
    location: "Berkeley ",
    instruments: "Vocals, Piano, Synths, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=DOp7RuJggdc",
    description:
      "They called it scary hill and we were all afraid They called it scary hill as we sledded through the day Sliding down too fast you'll end up in the creek You'd end up Scary hill and joint the other souls Wheel barrow wood tabagon doing barrel rolls Snow face misplaced among the evergreens And every halloween The adults would make a scene The things we didn't see That frightened me the most Grapes like eyeballs Witches making catcalls But down on scary hill there's some kind of ghost Singing Do you know me Yes I know you Will you follow me up the hill? I'll present you King tree queen tree Just listening to the rustling of their leaves Let's go to scary hill and build a wall of bricks line the floor with maple leaves and the roof is made of sticks These walls these walls protect us from the hill And a car goes by And something is awry Don't take the corner fast you'll end up in the ditch Station wagon families Old folks and drunk teens But up on scary hill there's some kind of witch Do you know me Yes I know you You are the reason I can't sit still I hear the rustling See my breath And I won't follow you up the hill But I'll present you king tree queen Listen to the rustling of their leaves",
    acousticproduced: "Produced",
    mood: "Pensive",
    spotify: "https://open.spotify.com/track/7y55FJxnUtnr7Jtiwegaib",
    itunes:
      "https://itunes.apple.com/ph/album/scary-hill/1133055443?i=1133055550",
    bandcamp: "https://jonathanmann.bandcamp.com/track/death-in-every-instant",
    tags: "Rock, Scary, Dark"
  },
  {
    number: 270,
    date: "2009-09-27T04:00:00.000Z",
    title: "Popcorn",
    length: "2:26",
    inkey: "Eb",
    tempo: 80,
    topic: "Childhood",
    location: "Berkeley ",
    instruments: "Vocals, Acoustic Guitar",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=iVt-TfittNY",
    description:
      "throw a cob of corn into the sun it'll be pop corn see the old pile of hay?",
    acousticproduced: "Produced",
    mood: "Pensive",
    spotify: "https://open.spotify.com/track/6EuZThOVFPWg1tJPTEzeyz",
    itunes: "https://itunes.apple.com/ph/album/popcorn/1133055443?i=1133055551",
    bandcamp: "https://jonathanmann.bandcamp.com/track/scary-hill",
    tags: "Folk, Wistful, Good"
  },
  {
    number: 271,
    date: "2009-09-28T04:00:00.000Z",
    title: "Big Wall Graphics From LTLPrints.com",
    length: "1:47",
    inkey: "C",
    tempo: 152,
    topic: "Commission",
    location: "Berkeley ",
    instruments: "Vocals, Piano, Synths, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=AiMxiAUVKgY",
    description:
      "This was a song request from the fine folks at www.ltlprints.com. They provide an awesome product! The video pretty much says it all.",
    acousticproduced: "Acoustic",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/0LId6sJ0xOFHAnRNmP8Iy0",
    itunes:
      "https://itunes.apple.com/ph/album/big-wall-graphics-from-ltlprints-com/1133055443?i=1133055552",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/throw-a-cob-of-corn-into-the-sun-popcorn",
    tags: "Electro, Silly"
  },
  {
    number: 272,
    date: "2009-09-29T04:00:00.000Z",
    title: "How to Defeat the Energy Vampire: the Song",
    length: "0:10",
    inkey: "Am",
    tempo: 80,
    topic: "Commission",
    location: "Berkeley ",
    instruments: "Vocals, Piano, Synths, Drum Machine",
    beard: "Clean",
    videoid: "https://youtu.be/UNHV67O3OdU",
    description:
      "The energy vampire is lurking in every outlet of your home. Garlic, silver, wooden stakes...these tools are useless. Luckily, your most powerful weapon is also easy to implement: TURN OFF YOUR POWERSTRIPS!",
    acousticproduced: "Produced",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/47m9kpLpeCIX9SrJtxs5LP",
    itunes:
      "https://itunes.apple.com/ph/album/how-to-defeat-the-energy-vampire/1133055443?i=1133055553",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/big-wall-graphics-from-ltlprints-com",
    tags: "Rock, Silly, Monster, Vampire"
  },
  {
    number: 273,
    date: "2009-09-30T04:00:00.000Z",
    title: "Vulcan Smile ",
    length: "0:24",
    inkey: "D",
    tempo: 140,
    topic: "Nerd",
    location: "Berkeley ",
    instruments: "Vocals, Piano, Synths, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=oBbBTwgDBBg",
    description: "I want to see a vulcan smile.",
    acousticproduced: "Produced",
    mood: "Chill",
    spotify: "https://open.spotify.com/track/1x0HjDS8RPODlDUM3K9Vxn",
    itunes:
      "https://itunes.apple.com/ph/album/vulcan-smile/1133055443?i=1133055554",
    bandcamp: "https://jonathanmann.bandcamp.com/track/vulcan-smile",
    tags: "Folk, Delicate, Sci-Fi, Star Trek"
  },
  {
    number: 274,
    date: "2009-10-01T04:00:00.000Z",
    title: "Downstairs Bear",
    length: "1:15",
    inkey: "C#m",
    tempo: 130,
    topic: "Childhood",
    location: "Berkeley ",
    instruments: "Vocals, Synths, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=ld1PvU8c3y8",
    description: "A true story.",
    acousticproduced: "Produced",
    mood: "Sad",
    spotify: "https://open.spotify.com/track/3CXBTVLp7K8KbZGk6liJgW",
    itunes:
      "https://itunes.apple.com/ph/album/downstairs-bear/1133055443?i=1133055555",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/how-to-defeat-the-energy-vampire-the-song",
    tags: "Electro, Dark, Teddy Bear"
  },
  {
    number: 275,
    date: "2009-10-02T04:00:00.000Z",
    title: "Ardipithicus Ramidus",
    length: "2:02",
    inkey: "E",
    tempo: 120,
    topic: "Animals",
    location: "Berkeley ",
    instruments: "Vocals, Synths, Samples, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=S-DCcrLIcL4",
    description: "Yay!",
    acousticproduced: "Produced",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/0cZzgtYnod9i2uDOW4aIJV",
    itunes:
      "https://itunes.apple.com/ph/album/ardipithicus-ramidus/1133062645?i=1133062833",
    bandcamp: "https://jonathanmann.bandcamp.com/track/downstairs-bear",
    tags: "Rock, Fun, Silly, Science, Famous Person, Artipithicus Ramidus"
  },
  {
    number: 276,
    date: "2009-10-03T04:00:00.000Z",
    title: "Hard Drive It Home",
    length: "1:36",
    inkey: "F",
    tempo: 120,
    topic: "Sex",
    location: "Berkeley ",
    instruments: "Vocals, Acoustic Guitar",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=0WJGGof6iQY",
    description:
      "i got this floppy disk i got this wet ware i don't know where to put it let me put it in you and then we'll hard drive it home I got two cocks and you got two vaginas do i love your body mod or do i love you let's hard drive it home i read your technical specifications i was impressed and you failed with flying colors every single turing test RAM RAM RAM my heart is open source there's no encryption here unless unless of course that's what you're into Touch your antler To my antennae Here have my pheromone shake Put your little claw in mine",
    acousticproduced: "Produced",
    mood: "Intense",
    spotify: "https://open.spotify.com/track/3qAVlafcjZGhMXk2FOAd0P",
    itunes:
      "https://itunes.apple.com/ph/album/hard-drive-it-home/1133062645?i=1133062834",
    bandcamp: "https://jonathanmann.bandcamp.com/track/ardipithecus-ramidus-2",
    tags: "Folk, Raunchy, Funny"
  },
  {
    number: 277,
    date: "2009-10-04T04:00:00.000Z",
    title: "You and Me and the Singularity",
    length: "2:50",
    inkey: "G#",
    tempo: 92,
    topic: "Love",
    location: "Berkeley ",
    instruments: "Vocals, Acoustic Guitar",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=_OoA0AZ1gr0",
    description:
      "Existence will become one constant orgasm a state that no one can deny with no boundaries or concealing we'll feel each other's feelings from the pope to bill o'reilly you and me in the singularity locked inextricably in heat and as our minds thaw and i'll forgive your every flaw as you and me are no longer you and me there'll be nothing left to fear as we go speeding towards zero and robots become sentient and jesus is revived along with everyone who ever died and they all forgive us for our sins jesus says hey you really fucked it up, ok that's just a given that's a start don't beat yourself up just because i was preaching love and you continued to hate with all your heart there'll be no more knowledge gaps in the never ending chapter approaching ever faster every day one collective cry one great big giant sigh and the city in the sky that floats away",
    acousticproduced: "Acoustic",
    mood: "Pensive",
    spotify: "https://open.spotify.com/track/1ZgFdXu2K79lW93e4p5OVc",
    itunes:
      "https://itunes.apple.com/ph/album/you-and-me-and-the-singularity/1133062645?i=1133062835",
    bandcamp: "https://jonathanmann.bandcamp.com/track/hard-drive-it-home",
    tags: "Folk, Wistful "
  },
  {
    number: 278,
    date: "2009-10-05T04:00:00.000Z",
    title: "Sex in Space",
    length: "2:35",
    inkey: "F",
    tempo: 85,
    topic: "Sex",
    location: "Berkeley ",
    instruments: "Vocals, Acoustic Guitar",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=SHyqW-fX3_Y",
    description:
      "Space ship, orbit, science all complete Sunshine, Red wine, I melt into my seat Soft hands, Lap dance",
    acousticproduced: "Acoustic",
    mood: "Intense",
    spotify: "https://open.spotify.com/track/1jFfZdKSR1uBUutiA5qhf8",
    itunes:
      "https://itunes.apple.com/ph/album/sex-in-space/1133062645?i=1133062836",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/you-and-me-and-the-singularity",
    tags: "Folk, Dreamy, Raunchy, "
  },
  {
    number: 279,
    date: "2009-10-06T04:00:00.000Z",
    title: "Nasa Bombed the Moon",
    length: "1:45",
    inkey: "B",
    tempo: 105,
    topic: "Nerd",
    location: "Berkeley ",
    instruments: "Vocals, Acoustic Guitar",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=GgWFVXoT71E",
    description: "They are going to, anyway. On Friday!",
    acousticproduced: "Acoustic",
    mood: "Chill",
    spotify: "https://open.spotify.com/track/5ZuoXvvpGKqJmR5PpE27ba",
    itunes:
      "https://itunes.apple.com/ph/album/nasa-bombed-the-moon/1133062645?i=1133062837",
    bandcamp: "https://jonathanmann.bandcamp.com/track/sex-in-space",
    tags: "Folk, Narrative, Science, Nasa, Moon"
  },
  {
    number: 280,
    date: "2009-10-07T04:00:00.000Z",
    title: "Pants in the Middle",
    length: "1:54",
    inkey: "D",
    tempo: 190,
    topic: "Object",
    location: "Berkeley ",
    instruments:
      "Vocals, Piano, Electric Guitar, Acoustic Guitar, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=1Q3Xyo166Rg",
    description:
      "i don't want pants too loose pants too tight when i want pants i want em just right in the middle pants in the middle bring a little lovin over here i don't want pants too long pants too short when i want pants i wan the right proportions some things you want exteme like your lovin and your dreams but when it comes to hems and seams not so much pants too big pants to small i'd rather where no pants at all first comes love then comes marriage then i'm stiching up the undercarriage",
    acousticproduced: "Acoustic",
    mood: "Intense",
    spotify: "https://open.spotify.com/track/7fmUwlz7AyV1W6R5enVJxe",
    itunes:
      "https://itunes.apple.com/ph/album/pants-in-the-middle/1133062645?i=1133062838",
    bandcamp: "https://jonathanmann.bandcamp.com/track/nasa-bombed-the-moon",
    tags: "Rock, Silly, Distortion, Pants"
  },
  {
    number: 281,
    date: "2009-10-08T04:00:00.000Z",
    title: "Hey, Mr. Bike Thief",
    length: "1:47",
    inkey: "Bm",
    tempo: 80,
    topic: "Bike",
    location: "Berkeley ",
    instruments: "Vocals, Synths, Samples, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=QzkP2-27kj0",
    description:
      "hey mr. bike thief you're a big jerk do you steal bikes cause you can't find work hey mr. bike thief life is hard but stealing bikes is not the ansar you stole my bike it was a piece of my life i was so happy when i got that bike and you took it away from me it was a gift from my girlfriend hey mr. bike thief i hope you get caught",
    acousticproduced: "Produced",
    mood: "Angry",
    spotify: "https://open.spotify.com/track/0gyIRioqDkbre2xwmgtyyy",
    itunes:
      "https://itunes.apple.com/ph/album/hey-mr-bike-thief/1133062645?i=1133062839",
    bandcamp: "https://jonathanmann.bandcamp.com/track/pants-in-the-middle",
    tags: "Rock, Sad, Theft"
  },
  {
    number: 282,
    date: "2009-10-09T04:00:00.000Z",
    title: "The LARP song",
    length: "1:29",
    inkey: "F",
    tempo: 90,
    topic: "Instrumental",
    location: "Berkeley ",
    instruments: "Samples, Drum Machine",
    beard: "N/A",
    videoid: "https://www.youtube.com/watch?v=BbsYHBFLL_4",
    description: "An instrumental.",
    acousticproduced: "Produced",
    mood: "Chill",
    spotify: "https://open.spotify.com/track/4dT2rqEdAXqruC4saCyIWk",
    itunes:
      "https://itunes.apple.com/ph/album/the-larp-song/1133062645?i=1133062840",
    bandcamp: "https://jonathanmann.bandcamp.com/track/hey-mr-bike-theif",
    tags: "Rock, Silly"
  },
  {
    number: 283,
    date: "2009-10-10T04:00:00.000Z",
    title: "Hey, It's October",
    length: "1:47",
    inkey: "Am",
    tempo: 85,
    topic: "Poetic",
    location: "Berkeley ",
    instruments: "Vocals, Synths, Samples, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=88yXZD1MILY",
    description:
      "it's october you know what that means it means halloween candy corn pagen rules",
    acousticproduced: "Produced",
    mood: "Intense",
    spotify: "https://open.spotify.com/track/3sdVs8CvvZr9kiep6UrhfF",
    itunes:
      "https://itunes.apple.com/ph/album/hey-its-october/1133062645?i=1133062871",
    bandcamp: "https://jonathanmann.bandcamp.com/track/the-larp-song",
    tags: "Rock, Dark, Scary, Distortion"
  },
  {
    number: 284,
    date: "2009-10-11T04:00:00.000Z",
    title: "Hey, Little insect and Spider",
    length: "0:45",
    inkey: "C",
    tempo: 100,
    topic: "Animals",
    location: "Berkeley ",
    instruments: "Vocals, Synths, Samples, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=7zDb-5UiDes",
    description:
      "spiders love to bite me insects all invite me to their bloodsucking party",
    acousticproduced: "Produced",
    mood: "Intense",
    spotify: "https://open.spotify.com/track/0Dm7yZeFjHChayvqp1cStz",
    itunes:
      "https://itunes.apple.com/ph/album/hey-little-insect-and-spider/1133062645?i=1133062872",
    bandcamp: "https://jonathanmann.bandcamp.com/track/hey-its-october",
    tags: "Rock, Dark, Animals, Insect, Spider"
  },
  {
    number: 285,
    date: "2009-10-12T04:00:00.000Z",
    title: "Nextivafax.com",
    length: "1:25",
    inkey: "F",
    tempo: 120,
    topic: "Commission",
    location: "Berkeley ",
    instruments: "Vocals, Piano, Samples, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=0gUDa5ZWDIk",
    description: "It's easy! It's fun! It's Nextiva vFax!",
    acousticproduced: "Produced",
    mood: "Chill",
    spotify: "https://open.spotify.com/track/2qG8YP3x8fiGaLB6DqnQ5R",
    itunes:
      "https://itunes.apple.com/ph/album/nextivafax-com/1133062645?i=1133062873",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/hey-little-insect-and-spider",
    tags: "Rock, Company, Nextivafax"
  },
  {
    number: 286,
    date: "2009-10-13T04:00:00.000Z",
    title: "Somebody Needs Your Help",
    length: "1:56",
    inkey: "C",
    tempo: 90,
    topic: "Commission",
    location: "Berkeley ",
    instruments: "Vocals, Synths, Samples, Drum Machine",
    beard: "N/A",
    videoid: "https://www.youtube.com/watch?v=x_nsSAzmVD0",
    description:
      "Animal Care and Control of NYC (which is a high-kill shelter), you can give their website www.nycacc.org.",
    acousticproduced: "Produced",
    mood: "Sad",
    spotify: "https://open.spotify.com/track/0U3nxqFQpQmYI2LJDysdOx",
    itunes:
      "https://itunes.apple.com/ph/album/somebody-needs-your-help/1133062645?i=1133062874",
    bandcamp: "https://jonathanmann.bandcamp.com/track/nextivafax-com",
    tags: "Rock, Animals, Dogs"
  },
  {
    number: 287,
    date: "2009-10-14T04:00:00.000Z",
    title: "Frack the Dow Jones",
    length: "2:25",
    inkey: "G",
    tempo: 110,
    topic: "Politics",
    location: "Berkeley ",
    instruments: "Vocals, Acoustic Guitar, Samples, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=fls6is7hSTo",
    description:
      "show me one man who gives a flying frack about the dow jones industrial and i'll show you a crook, a liar and a big asshole congradu-frakin-lautions it's reached 10000 again",
    acousticproduced: "Produced",
    mood: "Angry",
    spotify: "https://open.spotify.com/track/2GFHMQ2dswY6vdzzEX1zhO",
    itunes:
      "https://itunes.apple.com/ph/album/frack-the-dow-jones/1133062645?i=1133062875",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/somebody-needs-your-help",
    tags: "Folk, Heavy, Economy"
  },
  {
    number: 288,
    date: "2009-10-15T04:00:00.000Z",
    title: "Kickstarter.com",
    length: "1:39",
    inkey: "D",
    tempo: 70,
    topic: "Internet",
    location: "Berkeley ",
    instruments: "Vocals, Acoustic Guitar, Samples, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=gJmJkLkIv3M",
    description:
      "you have an idea but you don't have a lotta money you have the drive but you're sorely lacking funds maybe you want to finally write that novel making you're looking to get that album done maybe you've written a screenplay you're determined to see it filmed maybe you love to work with clay but you need to raise money for a kiln maybe you want to make a series of paintings or study the mating habits of frogs maybe you want to start a magazine or a rescue shelter for dogs everyone should find their passion and follow it but there's a barrier, sometimes and that's why you should go over to kickstarter and get your friends to help you climb, climb, climb",
    acousticproduced: "Produced",
    mood: "Chill",
    spotify: "https://open.spotify.com/track/15ynxZblqzOrGAPu6ftgvN",
    itunes:
      "https://itunes.apple.com/ph/album/kickstarter-com/1133062645?i=1133062876",
    bandcamp: "https://jonathanmann.bandcamp.com/track/frack-the-dow-jones",
    tags: "Folk, Company, Kickstarter"
  },
  {
    number: 289,
    date: "2009-10-16T04:00:00.000Z",
    title: "Just a Little More Tired",
    length: "2:35",
    inkey: "B",
    tempo: 160,
    topic: "Life",
    location: "Berkeley ",
    instruments: "Vocals, Synths, Samples, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=IimlrWxSeT4",
    description:
      "don't waste my time i haven't got all day you walk around like you",
    acousticproduced: "Produced",
    mood: "Tired",
    spotify: "https://open.spotify.com/track/4z0VoIzxqzmqGqscLi5DUQ",
    itunes:
      "https://itunes.apple.com/ph/album/just-a-little-more-tired/1133062645?i=1133062877",
    bandcamp: "https://jonathanmann.bandcamp.com/track/kickstarter-com",
    tags: "Electro, Dark"
  },
  {
    number: 290,
    date: "2009-10-17T04:00:00.000Z",
    title: "Treasure island",
    length: "4:41",
    inkey: "Fm",
    tempo: 60,
    topic: "Life",
    location: "Berkeley ",
    instruments: "Vocals, Acoustic Guitar",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=NcZjBEX5IW8",
    description:
      "sailing into half moon bay i spy a ship in great decay fresh gunpowder on the breeze the twilight rustle of palm trees seeking shelter on the shore snakes dance on the jungle floor human bones in a shallow grave floating torch leads to a cave the oracle of singing skull leads the way, the moon is full one knock two, then three, then four she leads us through temple door musty curtains and and rusty chains booby traps and old blood stains carefully with each step we creep following voices from the deep endless stairs spiral down in the stillness i felt i'd drown finally the dark was cleared on this earth all roads led here there was my love with cloaked guard levitating breathing hard she said heavy mountains, glowing birds it was the last thing i ever heard within my body my bones did shake all around around me the earth did quake i was falling down down down and we are buried with the treasure now",
    acousticproduced: "Produced",
    mood: "Intense",
    spotify: "https://open.spotify.com/track/0AFRBeVoxejrWevbS6P9pU",
    itunes:
      "https://itunes.apple.com/ph/album/treasure-island/1133062645?i=1133062878",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/just-a-little-more-tired",
    tags: "Folk, Dark, Narrative"
  },
  {
    number: 291,
    date: "2009-10-18T04:00:00.000Z",
    title: "Happy Birthday, Kelly Porter",
    length: "1:30",
    inkey: "G#",
    tempo: 90,
    topic: "Friend",
    location: "Berkeley ",
    instruments: "Vocals, Piano, Samples, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=DnuQfhP50FM",
    description:
      "kelly when you live paint colors mix, create the world kelly when you don't use",
    acousticproduced: "Acoustic",
    mood: "Happy",
    spotify: "https://open.spotify.com/track/7akkNJqUJAxP5iXBkfqBCv",
    itunes:
      "https://itunes.apple.com/ph/album/happy-birthday-kelly-porter/1133062645?i=1133062879",
    bandcamp: "https://jonathanmann.bandcamp.com/track/treasure-island",
    tags: "Rock, Hopeful, Birthday"
  },
  {
    number: 292,
    date: "2009-10-19T04:00:00.000Z",
    title: "Psoriasis Cure Now Walk",
    length: "0:30",
    inkey: "D",
    tempo: 75,
    topic: "Contest",
    location: "Berkeley ",
    instruments: "Vocals, Samples, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=68HiJSAl8GI",
    description: "Come out and show your support!",
    acousticproduced: "Produced",
    mood: "Excited",
    spotify: "https://open.spotify.com/track/5ChS0DxNbgLU8oWrc8PJxM",
    itunes:
      "https://itunes.apple.com/ph/album/psoriasis-cure-now-walk/1133062645?i=1133062880",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/happy-birthday-kelly-porter",
    tags: "Rock, Science, Psoriasis"
  },
  {
    number: 293,
    date: "2009-10-20T04:00:00.000Z",
    title: "It's This Rain",
    length: "3:32",
    inkey: "Am",
    tempo: 105,
    topic: "Poetic",
    location: "Berkeley ",
    instruments:
      "Vocals, Piano, Electric Guitar, Acoustic Guitar, Drum Machine",
    beard: "N/A",
    videoid: "https://www.youtube.com/watch?v=kPpfxu-IbsI",
    description:
      "there's no blue birds singing there's no robin crying there's only crows a singing rain their bringing crows are singing the rain their bringing i want you to come in from the rain into my arms again like you never left make everything the same the color of your hair black and soft and wet i must be insane those birds up in the trees are making fun of me they fly away so free i'm stuck here on the ground drowning in the rain hit my head against the wall push the rock back up the hill dance again alone to these old corny songs you never liked him anyway rain rain come on in can i fix you a drink make yourself at home rain rain look at me everybody's gone you're the only friend i have",
    acousticproduced: "Produced",
    mood: "Intense",
    spotify: "https://open.spotify.com/track/3Gbw1jqC5Kf0xv8YwnrU0u",
    itunes:
      "https://itunes.apple.com/ph/album/its-this-rain/1133062645?i=1133062881",
    bandcamp: "https://jonathanmann.bandcamp.com/track/psoriasis-cure-now-walk",
    tags: "Latin, Dark, Looming, Anthem"
  },
  {
    number: 294,
    date: "2009-10-21T04:00:00.000Z",
    title: "Lashes to Riches",
    length: "2:38",
    inkey: "D",
    tempo: 140,
    topic: "Contest",
    location: "Berkeley ",
    instruments: "Vocals, Acoustic Guitar, Samples, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=IULN-Ivd5P0",
    description:
      "Contest entry for http://www.lashalluremd.com $100,000 Lashes to Riches contest. What would I do with $100,00? Why, I'd start by cloning myself of course! Then, I'd buy a school bus,",
    acousticproduced: "Produced",
    mood: "Happy",
    spotify: "https://open.spotify.com/track/3RLij23YIHWzKzb1bqOyNy",
    itunes:
      "https://itunes.apple.com/ph/album/lashes-to-riches/1133062645?i=1133062882",
    bandcamp: "https://jonathanmann.bandcamp.com/track/its-this-rain",
    tags: "Rock, Cheesy, Fun, Bad, Plea"
  },
  {
    number: 295,
    date: "2009-10-22T04:00:00.000Z",
    title: "Beer Pong",
    length: "2:32",
    inkey: "B",
    tempo: 105,
    topic: "Poetic",
    location: "Berkeley ",
    instruments: "Vocals, Acoustic Guitar",
    beard: "N/A",
    videoid: "https://www.youtube.com/watch?v=QP_MC1slwjw",
    description:
      "This one was written by my friend Dan! Who are all these college kids on youtube, doing crazy tricks with ping pong balls? Why dont they do something to improve their lives? Or the lives of humankind. They could bake cookies for their grandmothers, or learn to play the accordion. Or teach ballet to inner city kids, in their free time. I know what your going to say, who the fuck am I to judge anyone else, And what have I ever done, thats worth a shit? Believe it or not the person Im disappointed in the most, is myself. I sleep too late and my hygienes not that good Ive played video games since I was ten and Ive never really saved the world, I know my chances of doing something great are getting fewer, Every time I play bioshock. Ive never watched the sunset with a child, or comforted a burn victim, in ICU. I drink too much and Im so afraid of being alone and dying. My only legacy a waste of space, another masturbator. was Gandhi ever bummed about all the time he spent weaving, Or just staring at the moon. Would Miamoto Musashi have written the five rings if he played grand theft auto? Dont get me wrong, I think the pong tricks are cool, and I cant imagine How hard they are to do. Im just saying how great the world would be, if we committed to caring For each other with the same intensity That we waste our lives.",
    acousticproduced: "Produced",
    mood: "Chill",
    spotify: "https://open.spotify.com/track/3gt80KAqWtBHqdVjSvah8X",
    itunes:
      "https://itunes.apple.com/ph/album/beer-pong/1133062645?i=1133062883",
    bandcamp: "https://jonathanmann.bandcamp.com/track/lashes-to-riches",
    tags: "Folk, Food, Beer"
  },
  {
    number: 296,
    date: "2009-10-23T04:00:00.000Z",
    title: "Who Needs Sleep",
    length: "2:43",
    inkey: "Am",
    tempo: 120,
    topic: "Poetic",
    location: "Berkeley ",
    instruments: "Vocals, Acoustic Guitar, Samples, Drum Machine",
    beard: "N/A",
    videoid: "https://www.youtube.com/watch?v=AxyxiJ0gC1g",
    description:
      "when the sky turns black and monsters attack and you can't get that minotaur off of your back it's just a matter of time before you come running cryin begging for some quaaludes and a bottle of wine when you hear the angels sing and see the gifts they bring they can read your mind but you're not thinking a thing your eyes go cross smelling pine cones and frost they hand you a book with a title that's embossed hey now give me a shiver don't you think it's time to be crossing the river this life is trial and money on the other side find milk and honey when the ground beneath you quakes with every step you take and you feel like the snowman out of oryx and crake and cardboard and toothpicks and briars and trail mix are the highlights of your day tell me who needs sleep can't find a partner to dance or to hold your hands no show tunes or tangos in the hazy expanse when it's finally your turn to collect what you've earned finding the spot will be your only concern",
    acousticproduced: "Produced",
    mood: "Chill",
    spotify: "https://open.spotify.com/track/5djUVtKnYiPYkcTrWIeL92",
    itunes:
      "https://itunes.apple.com/ph/album/who-needs-sleep/1133062645?i=1133062884",
    bandcamp: "https://jonathanmann.bandcamp.com/track/beer-pong",
    tags: "Folk, Dark, Myth"
  },
  {
    number: 297,
    date: "2009-10-24T04:00:00.000Z",
    title: "I'm a Bird, You're a Bird, Let's Get It On",
    length: "0:53",
    inkey: "F",
    tempo: 125,
    topic: "Animals",
    location: "Berkeley ",
    instruments: "Vocals, Piano, Samples, Drum Machine",
    beard: "N/A",
    videoid: "https://www.youtube.com/watch?v=zNtRinamudU",
    description: "Oh baby!",
    acousticproduced: "Produced",
    mood: "Intense",
    spotify: "https://open.spotify.com/track/01xLtqvJ2W8aJNwWj4rnvv",
    itunes:
      "https://itunes.apple.com/ph/album/im-a-bird-youre-a-bird-lets-get-it-on/1133062645?i=1133062885",
    bandcamp: "https://jonathanmann.bandcamp.com/track/who-needs-sleep",
    tags: "Rock, Animals, Bird"
  },
  {
    number: 298,
    date: "2009-10-25T04:00:00.000Z",
    title: "Jesus Said",
    length: "2:42",
    inkey: "E",
    tempo: 92,
    topic: "Poetic",
    location: "Berkeley ",
    instruments: "Vocals, Acoustic Guitar",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=uiU69lxypxM",
    description:
      "I wrote this drunk (and tired) after watching the new M. Moore.",
    acousticproduced: "Produced",
    mood: "Intense",
    spotify: "https://open.spotify.com/track/4QNJnWJpxF5E1sdRI9SEK1",
    itunes:
      "https://itunes.apple.com/ph/album/jesus-said/1133062645?i=1133062886",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/im-a-bird-youre-a-bird-lets-get-it-o",
    tags: "Folk, Myth, Famous Person, Jesus"
  },
  {
    number: 299,
    date: "2009-10-26T04:00:00.000Z",
    title: "NoSweatApparel.com",
    length: "1:48",
    inkey: "C",
    tempo: 120,
    topic: "Commission",
    location: "Berkeley ",
    instruments: "Vocals, Piano, Samples, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=Tep4EH-_BTU",
    description: "www.nosweatapparel.com",
    acousticproduced: "Acoustic",
    mood: "Chill",
    spotify: "https://open.spotify.com/track/7bK5pXv0qsaKaADLK7WOiF",
    itunes:
      "https://itunes.apple.com/ph/album/nosweatapparel-com/1133062645?i=1133062887",
    bandcamp: "https://jonathanmann.bandcamp.com/track/jesus-said",
    tags: "Rock, Social Justice"
  },
  {
    number: 300,
    date: "2009-10-27T04:00:00.000Z",
    title: "I Never Promised",
    length: "1:47",
    inkey: "C",
    tempo: 90,
    topic: "Poetic",
    location: "Berkeley ",
    instruments: "Vocals, Synths, Drum Machine",
    beard: "N/A",
    videoid: "https://www.youtube.com/watch?v=gUb8Idr8giU",
    description:
      "you smashed the door down broke every single plate and glass you punched a hole in the wall did anyone ever tell you you look like a criminal? with your blood shot eyes and crooked smile i think i need a break from you for a while when your caged canary sings will you know the song will you sing along when the wind rips down your pride will you run and hide or admit you're wrong",
    acousticproduced: "Produced",
    mood: "Intense",
    spotify: "https://open.spotify.com/track/2m87rjjn8mEnSCpy4QRlKr",
    itunes:
      "https://itunes.apple.com/ph/album/i-never-promised/1133062645?i=1133062888",
    bandcamp: "https://jonathanmann.bandcamp.com/track/nosweatapparel-com",
    tags: "Electro, Dark, Dreamy, Vocoder"
  },
  {
    number: 301,
    date: "2009-10-28T04:00:00.000Z",
    title: "Airplane to Tomorrow",
    length: "3:09",
    inkey: "C",
    tempo: 120,
    topic: "Poetic",
    location: "Berkeley ",
    instruments: "Vocals, Acoustic Guitar, Samples, Drum Machine",
    beard: "N/A",
    videoid: "https://www.youtube.com/watch?v=13t6jrHQrPQ",
    description:
      "nothing in my life works just right everythings a little bit broken",
    acousticproduced: "Produced",
    mood: "Sad",
    spotify: "https://open.spotify.com/track/5R1kYGYWfTh02P6lDo949B",
    itunes:
      "https://itunes.apple.com/ph/album/airplane-to-tomorrow/1133062645?i=1133062890",
    bandcamp: "https://jonathanmann.bandcamp.com/track/i-never-promised",
    tags: "Rock, Wistful"
  },
  {
    number: 302,
    date: "2009-10-29T04:00:00.000Z",
    title: "Creature of Habit",
    length: "1:56",
    inkey: "B",
    tempo: 110,
    topic: "Poetic",
    location: "Berkeley ",
    instruments: "Vocals, Piano, Samples, Drum Machine",
    beard: "N/A",
    videoid: "https://www.youtube.com/watch?v=z_IhAVoH1lQ",
    description:
      "a creature of habit a wish fulfillment puppet a breeze that doesn't blow a mind that doesn't know a hand of rock and roll",
    acousticproduced: "Produced",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/4EicUifJluYNpuT6a34NCJ",
    itunes:
      "https://itunes.apple.com/ph/album/creature-of-habit/1133062645?i=1133062891",
    bandcamp: "https://jonathanmann.bandcamp.com/track/airplane-to-tomorrow",
    tags: "Rock, Cheesy, Bad"
  },
  {
    number: 303,
    date: "2009-10-30T04:00:00.000Z",
    title: "Keith Valley Middle School",
    length: "1:35",
    inkey: "G",
    tempo: 130,
    topic: "Life",
    location: "Berkeley ",
    instruments: "Vocals, Acoustic Guitar",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=P2OBWAgP8gA",
    description: "For my new friends at Keith Valley Middle School!",
    acousticproduced: "Produced",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/4rEc8bGoekiwXpMmuNY5UC",
    itunes:
      "https://itunes.apple.com/ph/album/keith-valley-middle-school/1133062645?i=1133062892",
    bandcamp: "https://jonathanmann.bandcamp.com/track/creature-of-habit",
    tags: "Rock, Anthem, Wistful, Place, Keith Valley Middle School"
  },
  {
    number: 304,
    date: "2009-10-31T04:00:00.000Z",
    title: "I'm Tired Halloween Weirdness",
    length: "2:21",
    inkey: "Am",
    tempo: 94,
    topic: "Life",
    location: "Berkeley ",
    instruments: "Vocals, Piano, Samples, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=juu6TeGh9RA",
    description: "It's weird, I'm tired, I know, I know",
    acousticproduced: "Produced",
    mood: "Tired",
    spotify: "https://open.spotify.com/track/7sIVLC9UUUrj4AxYPTyObB",
    itunes:
      "https://itunes.apple.com/ph/album/im-tired-halloween-weirdness/1133062645?i=1133062893",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/keith-valley-middle-school",
    tags: "Folk, Scary, Halloween"
  },
  {
    number: 305,
    date: "2009-11-01T04:00:00.000Z",
    title: "To Lon Harris Who Called Me Creepy",
    length: "2:31",
    inkey: "Em",
    tempo: 80,
    topic: "Internet",
    location: "Berkeley ",
    instruments: "Vocals, Synths, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=WPWTcLcpFYE",
    description:
      "Here's the link where he calls me creepy: http://youtube.comedy.com/2009/11/01/...",
    mood: "Pensive\n",
    spotify: "https://open.spotify.com/track/2pI9BDcCCT4PNkVkJDeRi6",
    itunes:
      "https://itunes.apple.com/ph/album/to-lon-harris-who-called-me-creepy/1133062645?i=1133062895",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/im-tired-halloween-weirdness",
    tags: "Rock, Internet, Famous Person, Lon Harris"
  },
  {
    number: 306,
    date: "2009-11-02T05:00:00.000Z",
    title: "Cloud Computing for Beginners",
    length: "1:50",
    inkey: "A",
    tempo: 100,
    topic: "Commission",
    location: "Berkeley ",
    instruments: "Vocals, Synths, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=n-mtkeaecN0",
    description:
      'This is a song for the Appirio "Cloud Computing" video contest!',
    mood: "Silly",
    spotify: "https://open.spotify.com/track/2LKtGFe2wCLlOcEfMwgX92",
    itunes:
      "https://itunes.apple.com/ph/album/cloud-computing-for-beginners/1133062645?i=1133062896",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/to-lon-harris-who-called-me-creepy",
    tags: "Rock, Cheesy, Funny"
  },
  {
    number: 307,
    date: "2009-11-03T05:00:00.000Z",
    title: "I am Just a Messanger",
    length: "3:19",
    inkey: "Eb",
    tempo: 93,
    topic: "Poetic",
    location: "Berkeley ",
    instruments: "Vocals, Acoustic Guitar",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=P1lLTyHfLb8",
    description:
      "i am just a messenger from a town not far from here bearing news of your father's travels he has crossed the bandy bridge, and heads towards everclear",
    mood: "Pensive",
    spotify: "https://open.spotify.com/track/6DiuyUVOKdYmb2K8Bge0ZN",
    itunes:
      "https://itunes.apple.com/ph/album/i-am-just-a-messanger/1133062645?i=1133062898",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/cloud-computing-for-beginners",
    tags: "Folk, Dark, Narrative"
  },
  {
    number: 308,
    date: "2009-11-04T05:00:00.000Z",
    title: "Spell Or Prayer",
    length: "3:21",
    inkey: "F#m",
    tempo: 100,
    topic: "Poetic",
    location: "Berkeley ",
    instruments: "Vocals, Acoustic Guitar",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=SJMxzXCXeVU",
    description:
      "I twisted through the darkened streets cause i had lost my way i'd told so many lies that i couldn't keep them straight clearly this was punishment, this was how i'd have to pay once but twice as strong you can never really know what's inside somebody's head and when you think you're sure that's when someone winds up dead but you remember how she moved, can recall the words she said then again, you could be wrong and the tune that plays over all your days seems like a waste on you you're a fire hose you're a runny nose wearing panty hose for two you don't know which lie to stitch it's like a witches brew bits of hair falling everywhere with a spell or prayer you're through I cut a path across the square and ended up on the edge of town looking back i knew i'd have to get to higher ground if the world crashed below me at least i'd be safe and sound sleep till morning light i struggled to my feet after slipping on a rock wondering where julie was i wished only for a clock the sun was all obscured by a dark and massive flock of parrots who spoke to me in their flight at the top of mount mcormish i stopped surveyed the land it would have helped to know what to do, to have some kind of plan as it was i stepped so blindly, leading with my hands could i speak the word a terror struck me in my heart like i had never felt and just as strong and quick the world began to melt i found myself in an empty space void of heaven or of hell but in my head i heard",
    mood: "Pensive",
    spotify: "https://open.spotify.com/track/7IODFT6FJDMTtrL6qgfsgj",
    itunes:
      "https://itunes.apple.com/ph/album/spell-or-prayer/1133062645?i=1133062900",
    bandcamp: "https://jonathanmann.bandcamp.com/track/i-am-just-a-messanger",
    tags: "Folk, Dark, Narrative"
  },
  {
    number: 309,
    date: "2009-11-05T05:00:00.000Z",
    title: "It May Feel Like Everythings the Same",
    length: "2:21",
    inkey: "Ab",
    tempo: 90,
    topic: "Poetic",
    location: "Berkeley ",
    instruments: "Vocals, Acoustic Guitar",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=U-dvV5K1MEo",
    description:
      "on the banks of the river watching tugboats tug i looked to a squirrel for a hug instead i got an acorn thrown into my face and i cried why try to be something other than what you are ain't nothing lies down that path but pain change is gonna happen when you least expect it but it may feel like everything's the same on the top of a building watching cars like ants i asked a pigeon to dance instead i got some feathers spit out onto my shoe and i cried on the bottom of the ocean watching starfish crawl i asked a shark if she wanted to play baseball instead she up and ate me now i'm stuck inside her belly and i died",
    mood: "Happy",
    spotify: "https://open.spotify.com/track/2lZH428V8XX9MSzrPTVg37",
    itunes:
      "https://itunes.apple.com/ph/album/it-may-feel-like-everythings-the-same/1133062645?i=1133062901",
    bandcamp: "https://jonathanmann.bandcamp.com/track/spell-or-prayer",
    tags: "Folk, Light, Animals"
  },
  {
    number: 310,
    date: "2009-11-06T05:00:00.000Z",
    title: "The Large Hadron Collider Still Doesn't Work",
    length: "1:33",
    inkey: "C",
    tempo: 105,
    topic: "Science",
    location: "Berkeley ",
    instruments: "Vocals, Uke",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=PqBcDQn7KsA",
    description:
      "The large hadron collider is broken once again doesn't it seem like someone somewhere is trying to tell us something? like maybe if they turn that thing on the world will explode do they even know what will happen tell me, do they know? oh the large hadron collider looking for the higgs boson but will they find it or will they send us to the big hole in the sky",
    mood: "Chill",
    spotify: "https://open.spotify.com/track/4oo6i7cXU5joNXGFwSHeGm",
    itunes:
      "https://itunes.apple.com/ph/album/the-large-hadron-collider-still-doesnt-work/1133062645?i=1133062902",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/it-may-feel-like-everythings-the-same",
    tags: "Folk, Delicate, Frustrated, Science, Large Hadron Collider"
  },
  {
    number: 311,
    date: "2009-11-07T05:00:00.000Z",
    title: "Show Me Your Dorito Face",
    length: "0:30",
    inkey: "A",
    tempo: 85,
    topic: "Contest",
    location: "Berkeley ",
    instruments: "Vocals, Piano, Synths, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=JyuMoXHsvvc",
    description:
      "FOR A CONTEST. I'LL KEEP YOU UPDATED What's in a Dorito? Why does it make you jump out of your seat-o? Is it the cheesy cheesy can't be beat-o? Or something more concrete-o? Show me your Dorito face!",
    mood: "Intense",
    spotify: "https://open.spotify.com/track/2HCz10nCwhu7uU8IssFzpz",
    itunes:
      "https://itunes.apple.com/ph/album/show-me-your-dorito-face/1133062645?i=1133062903",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/the-large-hadron-collider-still-doesnt-work",
    tags: "Hip Hop, Cheesy, Bad"
  },
  {
    number: 312,
    date: "2009-11-08T05:00:00.000Z",
    title: "I am All Alone",
    length: "2:22",
    inkey: "Eb",
    tempo: 81,
    topic: "Poetic",
    location: "Berkeley ",
    instruments: "Vocals, Acoustic Guitar",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=lMZ69vndWrA",
    description:
      "there's no one here i'm all alone looks like it's just me myself and i tonight everybody's gone there's not a soul looks like it's just 'ol jonthan mann tonight an empty house is what i got empty as an empty parking lot empty as a an empty pot as empty as my brain no one else no animals looks like it's just me myself and i tonight no beating hearts no breathing lungs an empty house is where i sit empty as a an empty pit empty as an office where everyone quit empty as my mind",
    mood: "Pensive",
    spotify: "https://open.spotify.com/track/0ZHLm2k9uqkzto7qp8okZi",
    itunes:
      "https://itunes.apple.com/ph/album/i-am-all-alone/1133062645?i=1133062905",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/show-me-your-dorito-face",
    tags: "Folk, Delicate, Wistful"
  },
  {
    number: 313,
    date: "2009-11-09T05:00:00.000Z",
    title: "Cry, oh Cry, Boo-Hoo So Sad",
    length: "2:25",
    inkey: "G",
    tempo: 70,
    topic: "Poetic",
    location: "Berkeley ",
    instruments: "Vocals, Piano, Samples, Drum Machine",
    beard: "N/A",
    videoid: "https://www.youtube.com/watch?v=5JyhYgfsejQ",
    description:
      "cry for the moon and for the stars for the tunes they sing in bars for the chance you'll never get cry for the sun and the atmosphere for the gun in the world's ear for the dance with your little pet cry if it's the last thing that you do from here to Malibu let the dripping keep your time i know that it's hard to let go of the past and to keep the demons at bay so go walk soft even if you're going last you will be first someday so cry in the morning in the night when it's almost but not quite the worst you've ever seen and cry for the rining of the bells for the space between your cells where ganglia dream",
    mood: "Sad",
    spotify: "https://open.spotify.com/track/03H1fMqWebjp1SarcTXT7w",
    itunes:
      "https://itunes.apple.com/ph/album/cry-oh-cry-boo-hoo-so-sad/1133062645?i=1133062906",
    bandcamp: "https://jonathanmann.bandcamp.com/track/i-am-all-alone",
    tags: "Rock, Cheesy, 80s, Dreamy"
  },
  {
    number: 314,
    date: "2009-11-10T05:00:00.000Z",
    title: "Winning Feels Good, Losing Feels Bad",
    length: "0:25",
    inkey: "C",
    tempo: 120,
    topic: "Life",
    location: "Berkeley ",
    instruments: "Vocals, Synths, Drum Machine",
    beard: "N/A",
    videoid: "https://www.youtube.com/watch?v=u0L_5Xvn8Ww",
    description: "Some observations that I've made.",
    mood: "Intense",
    spotify: "https://open.spotify.com/track/53vvjxnDdQpOVdYqqUeMEp",
    itunes:
      "https://itunes.apple.com/ph/album/winning-feels-good-losing-feels-bad/1133062645?i=1133062907",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/cry-oh-cry-boo-hoo-so-sad",
    tags: "Rock, Cheesy, Heavy, Distortion"
  },
  {
    number: 315,
    date: "2009-11-11T05:00:00.000Z",
    title: "20 minutes With the President",
    length: "5:45",
    inkey: "C",
    tempo: 85,
    topic: "Politics",
    location: "Berkeley ",
    instruments: "Vocals, Piano, Samples, Drum Machine",
    beard: "Beard",
    videoid: "https://www.youtube.com/watch?v=ilB_5R6xSJA",
    description:
      'This is my interpretation of the script written by Charlie Sheen and Alex Jones, called "20 Minutes With The President". To learn more, visit www.infowars.com',
    mood: "Anxious",
    spotify: "https://open.spotify.com/track/3kt2uxHEl2F5wdhKHGdj3c",
    itunes:
      "https://itunes.apple.com/ph/album/20-minutes-and-the-president/1133062645?i=1133062909",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/winning-feels-good-losing-feels-bad",
    tags: "Rock, Funny, Cheesy, Famous Person, Charlie Sheen, Obama"
  },
  {
    number: 316,
    date: "2009-11-12T05:00:00.000Z",
    title: "Mr. Barry Screwskull, Number Six Hundred and Twelve",
    length: "5:46",
    inkey: "D",
    tempo: 113,
    topic: "Poetic",
    location: "Berkeley ",
    instruments:
      "Vocals, Acoustic Guitar, Electric Guitar, Samples, Drum Machine",
    beard: "N/A",
    videoid: "https://www.youtube.com/watch?v=4oeaBCQYUzs",
    description:
      "This is for song fu: http://bit.ly/songfu\nmy name is mr. barry screwskull i drive those screws all day long on the banks of the subterranean river i dream of my home when i was just a little itty bitty pup my pappy said to me barry, i'm not long for this world i'm a heading for the surface today it was on that day that i knew i was alone though my comrades are all around me everywhere deep inside my throat are words never spoken harder than a sailor's but softer than a prayer don't you know the time has come for leaving the end is near the calandar draws to a close fixated on your claws, if you took the time to pause you'd start believing you'd root it out of the dirt with your nose i never saw the point of marriage what use have i for a wife kick out a few pups, watch the sunday parade go by no, not me, that is not my life in the back of my burrow i keep it all hidden my first class ticket straight out of here you say you want to come with me but i don't think you understand where i'm going all molemen disappear so it's goodbye to the tunnels and gossip goodbye to the old tin whistle whine goodbye to the subterranean river goodbye to the home that was never mine",
    mood: "Intense",
    spotify: "https://open.spotify.com/track/4eVC7QPZxDXADGrbK7L3lu",
    itunes:
      "https://itunes.apple.com/ph/album/mr-barry-screwskull-number-six-hundred-and-twelve/1133062645?i=1133062910",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/20-minutes-with-the-president",
    tags: "Folk, Wistful, Narrative "
  },
  {
    number: 317,
    date: "2009-11-13T05:00:00.000Z",
    title: "The Beating of a Single Heart",
    length: "2:57",
    inkey: "F",
    tempo: 100,
    topic: "Contest",
    location: "Berkeley ",
    instruments: "Vocals, Acoustic Guitar, Samples, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=AalyJ_UvC_4",
    description: "N/A",
    mood: "Excited",
    spotify: "https://open.spotify.com/track/2u8dRVNyfiaWkBuJ55npJw",
    itunes:
      "https://itunes.apple.com/ph/album/the-beating-of-a-single-heart/1133062645?i=1133062912",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/mr-barry-screwskull-number-six-hundred-and-twelve",
    tags: "Folk, Hopeful, Wistful, Anthem"
  },
  {
    number: 318,
    date: "2009-11-14T05:00:00.000Z",
    title: "Song a Day, Saturday",
    length: "1:30",
    inkey: "C",
    tempo: 130,
    topic: "Life",
    location: "Berkeley ",
    instruments: "Vocals, Acoustic Guitar, Samples, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=yu-ZJE2tOo0",
    description: "A song and video for a Nikon contest.",
    mood: "Happy",
    spotify: "https://open.spotify.com/track/7MoMBv4Z21iE4jsYmmbwkf",
    itunes:
      "https://itunes.apple.com/ph/album/song-a-day-saturday/1133062645?i=1133062913",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/the-beating-of-a-single-heart",
    tags: "Folk, Fun, Narrative"
  },
  {
    number: 319,
    date: "2009-11-15T05:00:00.000Z",
    title: "Sunday Evening Sad, Slow Song",
    length: "2:14",
    inkey: "Em",
    tempo: 73,
    topic: "Life",
    location: "Berkeley ",
    instruments: "Vocals, Acoustic Guitar",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=eIzZU0k1h-Y",
    description: "Made it up on the spot!",
    mood: "Sad",
    spotify: "https://open.spotify.com/track/5QJqcku6zCeSZytdalV137",
    itunes:
      "https://itunes.apple.com/ph/album/sunday-evening-sad-slow/1133062645?i=1133062914",
    bandcamp: "https://jonathanmann.bandcamp.com/track/song-a-day-saturday",
    tags: "Folk, Dark, Delicate"
  },
  {
    number: 320,
    date: "2009-11-16T05:00:00.000Z",
    title: "A Wonderful Pistcachio Discovery",
    length: "0:30",
    inkey: "E",
    tempo: 90,
    topic: "Contest",
    location: "Berkeley ",
    instruments:
      "Vocals, Acoustic Guitar, Electric Guitar, Samples, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=gsGQLWA29a0",
    description:
      "We know not exactly how pre-historic man managed to open his pistachio nuts. We do, however, know that he struggled with this dilemma. Moving forward in history, we find evidence of a Very Hairy Scientist making use of sound waves to burst open the protective pistachio shell.",
    mood: "Intense",
    spotify: "https://open.spotify.com/track/1sqYPgr5lNrAPgkV2jkfH2",
    itunes:
      "https://itunes.apple.com/ph/album/a-wonderful-pistcachio-discovery/1133062645?i=1133062915",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/sunday-evening-sad-slow-song",
    tags: "Rock, Distortion, Silly"
  },
  {
    number: 321,
    date: "2009-11-17T05:00:00.000Z",
    title: "The Story of Wandering Fall, Act 1, introdruction",
    length: "0:46",
    inkey: "F",
    tempo: 100,
    topic: "Poetic",
    location: "Berkeley ",
    instruments: "Vocals, Synths, Samples, Drum Machine",
    beard: "N/A",
    videoid: "https://www.youtube.com/watch?v=FNcjBZAvLR4",
    description:
      "Over the next 6 days, starting today, I'm unveiling a very impromptu mini-rock opera that I've conceived. Each installment is no longer than a minute. It takes place in space. I'm not going to say much more about it until all of Act 1 has been posted, but I'll be curious to hear your comments. If you want to discuss it with me, post on my rarely used forum at http://www.rockcookiebottom.lefora.com Hope to hear from you.",
    mood: "Chill",
    spotify: "https://open.spotify.com/track/1nXP3GEwN7IM7tl49dFQXQ",
    itunes:
      "https://itunes.apple.com/ph/album/the-story-of-wandering-fall/1133062645?i=1133062917",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/a-wonderful-pistcachio-discovery",
    tags: "Electro, Light, Wandering Fall"
  },
  {
    number: 322,
    date: "2009-11-18T05:00:00.000Z",
    title: "Wandering the Universe",
    length: "0:40",
    inkey: "C",
    tempo: 105,
    topic: "Poetic",
    location: "Berkeley ",
    instruments: "Vocals, Synths, Samples, Drum Machine",
    beard: "N/A",
    videoid: "https://www.youtube.com/watch?v=lQhz4aonf84",
    description: "Go here to discuss: http://www.rockcookiebottom.lefora.com/",
    mood: "Chill",
    spotify: "https://open.spotify.com/track/0xeqcitPL1SUd7kTuNKUtW",
    itunes:
      "https://itunes.apple.com/ph/album/wandering-the-universe/1133062645?i=1133062918",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/the-story-of-wandering-fall-act-1-introdruction",
    tags: "Electro, Narrative, Wandering Fall"
  },
  {
    number: 323,
    date: "2009-11-19T05:00:00.000Z",
    title: "At the Edge of the Universe",
    length: "0:43",
    inkey: "A",
    tempo: 80,
    topic: "Poetic",
    location: "Berkeley ",
    instruments: "Vocals, Synths, Samples, Drum Machine",
    beard: "N/A",
    videoid: "https://www.youtube.com/watch?v=Sn6hfDT9FTU",
    description: "Something is afoot at the edge of the universe.",
    mood: "Chill",
    spotify: "https://open.spotify.com/track/36MLs0sU5VgTqW31aenCAd",
    itunes:
      "https://itunes.apple.com/ph/album/at-the-edge-of-the-universe/1133062645?i=1133062919",
    bandcamp: "https://jonathanmann.bandcamp.com/track/wandering-the-universe",
    tags: "Electro, Narrative, Wandering Fall, Dark"
  },
  {
    number: 324,
    date: "2009-11-20T05:00:00.000Z",
    title: "And With a Name...",
    length: "0:43",
    inkey: "Eb",
    tempo: 85,
    topic: "Poetic",
    location: "Berkeley ",
    instruments: "Vocals, Synths, Samples, Drum Machine",
    beard: "N/A",
    videoid: "https://www.youtube.com/watch?v=0_xaRMdRgS0",
    description: "Our hero finds a name.",
    mood: "Chill",
    spotify: "https://open.spotify.com/track/4ugvYThmKyjmlTCXzPWs4h",
    itunes: "https://itunes.apple.com/ph/album/a-name/1133062645?i=1133062920",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/at-the-edge-of-the-universe",
    tags: "Electro, Narrative, Wandering Fall, Light"
  },
  {
    number: 325,
    date: "2009-11-21T05:00:00.000Z",
    title: "I am Alone",
    length: "0:46",
    inkey: "E",
    tempo: 60,
    topic: "Poetic",
    location: "Berkeley ",
    instruments: "Vocals, Synths, Samples, Drum Machine",
    beard: "N/A",
    videoid: "https://www.youtube.com/watch?v=DjFt3976STY",
    description:
      "Don't forget to go to my forum and discuss! http://rockcookiebottom.lefora.com/",
    mood: "Sad",
    spotify: "https://open.spotify.com/track/6czAK9iPtjyhXUTNXHCLT0",
    itunes:
      "https://itunes.apple.com/ph/album/i-am-alone/1133062645?i=1133062921",
    bandcamp: "https://jonathanmann.bandcamp.com/track/and-with-a-name",
    tags: "Electro, Narrative, Wandering Fall"
  },
  {
    number: 326,
    date: "2009-11-22T05:00:00.000Z",
    title: "Contact",
    length: "0:45",
    inkey: "Gm",
    tempo: 85,
    topic: "Poetic",
    location: "Berkeley ",
    instruments: "Vocals, Congas, Samples, Drum Machine",
    beard: "N/A",
    videoid: "https://www.youtube.com/watch?v=hBsyimOgLDQ",
    description: "Our hero makes contact.",
    mood: "Pensive",
    spotify: "https://open.spotify.com/track/5Fu7Wl9bhI8zmI5zAyGFIN",
    itunes: "https://itunes.apple.com/ph/album/contact/1133062645?i=1133062923",
    bandcamp: "https://jonathanmann.bandcamp.com/track/i-am-alone",
    tags: "Jazz, Narrative, Wandering Fall, Hopeful"
  },
  {
    number: 327,
    date: "2009-11-23T05:00:00.000Z",
    title: "The Story of Wandering Fall, Act 1, Recap",
    length: "2:52",
    inkey: "G",
    tempo: 100,
    topic: "Poetic",
    location: "Berkeley ",
    instruments: "Vocals, Acoustic Guitar",
    beard: "N/A",
    videoid: "https://www.youtube.com/watch?v=Fu9tgu8OULc",
    description: "TO DISCUSS: http://rockcookiebottom.lefora.com/",
    mood: "Chill",
    spotify: "https://open.spotify.com/track/62dsIxJl5LwjgXBWafZvbI",
    itunes:
      "https://itunes.apple.com/ph/album/the-story-of-wandering-fall-recap/1133062645?i=1133062925",
    bandcamp: "https://jonathanmann.bandcamp.com/track/contact",
    tags: "Folk, Narrative, Wandering Fall"
  },
  {
    number: 328,
    date: "2009-11-24T05:00:00.000Z",
    title: "Cold Feet",
    length: "2:02",
    inkey: "E",
    tempo: 90,
    topic: "Poetic",
    location: "Los Angeles",
    instruments: "Vocals, Acoustic Guitar",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=aVIBfAvQ0bw",
    description: "It's cold",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/0npuHqH31sQVpJuNQIPtni",
    itunes:
      "https://itunes.apple.com/ph/album/cold-feet/1133062645?i=1133062929",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/the-story-of-wandering-fall-act-1-recap",
    tags: "Folk, Weather, Cold"
  },
  {
    number: 329,
    date: "2009-11-25T05:00:00.000Z",
    title: "Get Your Hand Out of the Hunny Pot",
    length: "2:52",
    inkey: "D",
    tempo: 85,
    topic: "Poetic",
    location: "Los Angeles",
    instruments: "Vocals, Acoustic Guitar",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=SfHLCjzM4aQ",
    description:
      "when you're wandering the woods holding candles in the night and the bears pick up your scent",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/58oYpWLjkrTG3MBFCiby1Z",
    itunes:
      "https://itunes.apple.com/ph/album/get-your-hand-out-of-the-hunny-pot/1133062645?i=1133062934",
    bandcamp: "https://jonathanmann.bandcamp.com/track/cold-feet",
    tags: "Folk, Narrative, Fun"
  },
  {
    number: 330,
    date: "2009-11-26T05:00:00.000Z",
    title: "Zombie Turkey",
    length: "2:32",
    inkey: "Fm",
    tempo: 85,
    topic: "Food",
    location: "Los Angeles",
    instruments: "Vocals, Acoustic Guitar",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=fD_xNc_Wzlw",
    description:
      "you went to the supermarket got your turkey wrapped in plastic cooked it in the oven just right should come out fantastic the whole family's coming over you put on your evening gown but creeping up behind you all moist and golden brown it's the zombie turkey coming to pay you back you run up the stairs into the bathroom lock the door you can hear her boney legs banging on the floor she's coming ever closer now, you look out the window to see an entire neighborhood overrun by zombie turkeys they are zombie turkeys and they're coming to pay you back she's banging down the door now it looks like there's no escape you can't outrun her because you're fat and out of shape if only you exercised more, ate less, you'd be thinner what a terrible way to die to be eaten by your dinner by a zombie turkey who has come to pay you back",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/2XsRPISfUMYUwSf35e164p",
    itunes:
      "https://itunes.apple.com/ph/album/zombie-turkey/1133062645?i=1133062939",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/get-your-hand-out-of-the-hunny-pot",
    tags: "Folk, Dark, Scary, Zombie, Bird, Turkey, Holiday, Thanksgiving"
  },
  {
    number: 331,
    date: "2009-11-27T05:00:00.000Z",
    title: "Dancing Fin",
    length: "1:23",
    inkey: "Bb",
    tempo: 115,
    topic: "Friend",
    location: "Los Angeles",
    instruments: "Vocals, Acoustic Guitar",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=xWEAzAu-zdE",
    description:
      "My good friend from way, way back in high school came out for a visit with his song Fin! We had a great time, going out for sushi and then some frozen yogurt! I started singing this song and I figured it could just be my song of the day.",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/2QrA6aAg5uNgNrR0pyIZhy",
    itunes:
      "https://itunes.apple.com/ph/album/dancing-fin/1133062645?i=1133062942",
    bandcamp: "https://jonathanmann.bandcamp.com/track/zombie-turkey",
    tags: "Folk, Rough, Funny"
  },
  {
    number: 332,
    date: "2009-11-28T05:00:00.000Z",
    title: "The Best Day of My Life pt 1",
    length: "2:40",
    inkey: "F",
    tempo: 100,
    topic: "Poetic",
    location: "Los Angeles",
    instruments: "Vocals, Acoustic Guitar",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=Ph4HApxbWvU",
    description:
      "there's a fire in the sky it's a tower made of clouds and it's power rings out over creation meanwhile on the ground waves of frozen sound break upon the backs of stale frustration and citizens wake up at the sensation rub their eyes no melody or words could have cut quite like the sword swung by the hand of evolution to live and grow and die without ever knowing why knowing how to ask but finding no solution calling it divine retribution cut the cords we're not abandoned we are abandoning before we learned to talk we had to learn to sing without a plan we can't demand a thing we can't demand a thing i was on my way to school i saw her cross the street and her power sent out waves upon the pavement i pulled over then and there i had to catch my breath and stare in this delicate amazement i felt utterly exposed, stripped naked to the bone when she came up to the car and asked, \"do you know where we are?\" i couldn't tell if she was serious or joking i tried to say yes and planet earth, i guess but the sounds out of my mouth were more like choking in the distance some peeper frogs were croaking to the moon we were married it was the first of may and i carried her and she carried me the entire way it was scary but it was the best day of my life",
    mood: "Pensive",
    spotify: "https://open.spotify.com/track/5Fe98JTAGGLCNxBgmgEchW",
    itunes:
      "https://itunes.apple.com/ph/album/the-best-day-of-my-life-pt-1/1133062645?i=1133062946",
    bandcamp: "https://jonathanmann.bandcamp.com/track/dancing-fin",
    tags: "Folk, Wistful, Looming"
  },
  {
    number: 333,
    date: "2009-11-29T05:00:00.000Z",
    title: "The Best Day of My Life pt 2",
    length: "2:42",
    inkey: "F",
    tempo: 100,
    topic: "Poetic",
    location: "Los Angeles",
    instruments: "Vocals, Acoustic Guitar",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=5tlkSQ1Xjis",
    description:
      "in my house there is a room and in that room there is a drawer and in that drawer is a list of all my worries",
    mood: "Pensive",
    spotify: "https://open.spotify.com/track/6s5lPm5SJHhlqxbYEv7Tql",
    itunes:
      "https://itunes.apple.com/ph/album/the-best-day-of-my-life-pt-2/1133062645?i=1133062950",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/the-best-day-of-my-life-pt",
    tags: "Folk, Wistful, Looming"
  },
  {
    number: 334,
    date: "2009-11-30T05:00:00.000Z",
    title: "It's Good to Be Home",
    length: "3:26",
    inkey: "E",
    tempo: 160,
    topic: "Poetic",
    location: "Berkeley ",
    instruments: "Vocals, Acoustic Guitar",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=dSmWIz8xCD4",
    description:
      "when moses returned from a long trip to the mountain when god had gone silent",
    mood: "Happy",
    spotify: "https://open.spotify.com/track/2BYmzDkiygaeaE9JjsjmVs",
    itunes:
      "https://itunes.apple.com/ph/album/its-good-to-be-home/1133062645?i=1133062955",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/the-best-day-of-my-life-pt-2",
    tags: "Folk, Rough"
  },
  {
    number: 335,
    date: "2009-12-01T05:00:00.000Z",
    title: "Coors Ad, Collaborationz",
    length: "0:26",
    inkey: "Em",
    tempo: 105,
    topic: "Contest",
    location: "Berkeley ",
    instruments: "Vocals, Synths, Samples, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=peW1y38MmTg",
    description: "This is for a contest over at www.poptent.net",
    mood: "Intense",
    spotify: "https://open.spotify.com/track/1oTka73PHs7OXoaSYUnMwm",
    itunes:
      "https://itunes.apple.com/ph/album/coors-ad-collaborationz/1133062645?i=1133062958",
    bandcamp: "https://jonathanmann.bandcamp.com/track/its-good-to-be-home",
    tags: "Hip Hop, Cheesy, Funny"
  },
  {
    number: 336,
    date: "2009-12-02T05:00:00.000Z",
    title: "Seeing Clearly",
    length: "1:08",
    inkey: "C",
    tempo: 130,
    topic: "Contest",
    location: "Berkeley ",
    instruments: "Vocals, Synths, Samples, Drum Machine",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=SEBHYYbWFsc",
    description: "Yet another contest...",
    mood: "Excited",
    spotify: "https://open.spotify.com/track/7e7s0VeZlRFkGjgal5uGSS",
    itunes:
      "https://itunes.apple.com/ph/album/seeing-clearly/1133062645?i=1133062959",
    bandcamp: "https://jonathanmann.bandcamp.com/track/coors-ad-collaborationz",
    tags: "Electro, Cheesy, Bad"
  },
  {
    number: 337,
    date: "2009-12-03T05:00:00.000Z",
    title: "Black Holes",
    length: "3:57",
    inkey: "A",
    tempo: 100,
    topic: "Love",
    location: "Berkeley ",
    instruments: "Vocals, Uke, Samples, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=3O9KXyZoFFE",
    description: "N/A",
    mood: "Happy",
    spotify: "https://open.spotify.com/track/0T2YmismoXIy7n4wesIdTS",
    itunes:
      "https://itunes.apple.com/ph/album/black-holes/1133062645?i=1133062960",
    bandcamp: "https://jonathanmann.bandcamp.com/track/seeing-clearly",
    tags: "Folk, Science, Black Holes"
  },
  {
    number: 338,
    date: "2009-12-04T05:00:00.000Z",
    title: "Time to Save With VMware",
    length: "2:19",
    inkey: "C",
    tempo: 140,
    topic: "Contest",
    location: "Berkeley ",
    instruments: "Vocals, Synths, Samples, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=9o_JSpw0XAI",
    description:
      "I'm musician and songwriter. I've been writing a song a day since January 1st, 2009. I've partially turned the project into a business: I make songs and videos for companies.",
    mood: "Silly",
    spotify: "https://open.spotify.com/track/7olLvR4MeAflxscRjnBrFj",
    itunes:
      "https://itunes.apple.com/ph/album/time-to-save-vmware/1133062645?i=1133062961",
    bandcamp: "https://jonathanmann.bandcamp.com/track/black-holes",
    tags: "Electro, Cheesy"
  },
  {
    number: 339,
    date: "2009-12-05T05:00:00.000Z",
    title:
      "Don't Want to Write My Song Today, Just \nWant to Play New Super Mario Bros. Wii",
    length: "2:51",
    inkey: "G",
    tempo: 122,
    topic: "Life",
    location: "Berkeley ",
    instruments: "Vocals, Acoustic Guitar",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=NJDYbJklQWA",
    description: "Yep.",
    mood: "Sad",
    spotify: "https://open.spotify.com/track/0oYNOKfmNH7Xpiwv0IDepy",
    itunes:
      "https://itunes.apple.com/ph/album/dont-want-to-write-my-song-today-just-want-to-play/1133062645?i=1133062962",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/time-to-save-with-vmware",
    tags: "Folk, Silly, Wistful"
  },
  {
    number: 340,
    date: "2009-12-06T05:00:00.000Z",
    title: "Soldier",
    length: "1:20",
    inkey: "A",
    tempo: 120,
    topic: "Poetic",
    location: "Berkeley ",
    instruments: "Vocals, Synths, Drum Machine",
    beard: "N/A",
    videoid: "https://www.youtube.com/watch?v=opBydmbqnu8",
    description:
      "Footage from the Prelinger Archive put down that knife and apologize you've made a fool of the world for the very last time i'm not your soldier i'm not your gun i'm not the only one who sees what you have done",
    mood: "Intense",
    spotify: "https://open.spotify.com/track/2UNWuwELot7DnTSklHSZV0",
    itunes: "https://itunes.apple.com/ph/album/soldier/1133062645?i=1133062963",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/dont-want-to-write-my-song-today-just-want-to-play-new-super-mario-bros-wii",
    tags: "Electro, Dark, Vocoder"
  },
  {
    number: 341,
    date: "2009-12-07T05:00:00.000Z",
    title: "Gun",
    length: "1:16",
    inkey: "D#",
    tempo: 80,
    topic: "Object",
    location: "Berkeley ",
    instruments: "Vocals, Piano, Synths, Drum Machine",
    beard: "N/A",
    videoid: "https://www.youtube.com/watch?v=vTEDsqeLBZ8",
    description:
      "Put down put down that gun and come inside there's no reason to hide around here we're all friends",
    mood: "Intense",
    spotify: "https://open.spotify.com/track/2prkKlBnq1HFVVLFUw1aA1",
    itunes: "https://itunes.apple.com/ph/album/gun/1133062645?i=1133062964",
    bandcamp: "https://jonathanmann.bandcamp.com/track/soldier",
    tags: "Electro, Dark, Dreamy, Gun"
  },
  {
    number: 342,
    date: "2009-12-08T05:00:00.000Z",
    title: "Jesus Christ at Christmas Time",
    length: "2:51",
    inkey: "A#",
    tempo: 90,
    topic: "Christmas",
    location: "Berkeley ",
    instruments:
      "Vocals, Acoustic Guitar, Electric Guitar, Samples, Drum Machine",
    beard: "N/A",
    videoid: "https://www.youtube.com/watch?v=eDR0hULcENs",
    description:
      "jesus christ when he wasn't being naughty he was nice if you were corrupt roman or jew it didn't matter to him he'd stick it to you he'd cast you out of the temple all you money grubbing fools he laughed in the face of bureaucrats who tried to use him like a tool jesus christ he was like a lion we're all just mice he didn't carry a gun he didn't need one the gleam of his fiery gaze was enough re if you were throwing stones he'd make you look at yourself and with his mind reading abilities he'd make you cry out for help go your country needs you to shop as much as you can remember christ and his words buy buy buy buy buy jesus christ would been disgusted by all the lights if comes back all hope is lost he's gonna jump right back up on that cross",
    mood: "Intense",
    spotify: "https://open.spotify.com/track/1gkm4XXt1vcg70qFRSWzPU",
    itunes:
      "https://itunes.apple.com/ph/album/jesus-christ-at-christmas-time/1133062645?i=1133062965",
    bandcamp: "https://jonathanmann.bandcamp.com/track/gun",
    tags: "Rock, Distortion, Hopeful, Good, Holiday, Christmas"
  },
  {
    number: 343,
    date: "2009-12-09T05:00:00.000Z",
    title:
      "Upon Seeing the Twitpic Conversation \nBetween Demi Moore and Ashton Kutcher",
    length: "1:43",
    inkey: "A#",
    tempo: 110,
    topic: "Pop Culture",
    location: "Berkeley ",
    instruments: "Vocals, Acoustic Guitar",
    beard: "N/A",
    videoid: "https://www.youtube.com/watch?v=PfIi_MJTGVI",
    description:
      "Ashton Kutcher and Demi Moore i've never really thought about you before but whilst lost in the tubes and very bored i stumbled on to these pictures of you i think that it's the details that make these breathe i don't like MSG in my chinese food eith -er wonderfully mundane, cute and carefree and so i'm writing this song so rare, so rare so unpackaged and unscripted a real sense of playfulness which these days has gone missing in a world without privacy to share a tender moment like this is beautiful looking on wikipedia, your anniversary i've missed but i'll wish you a happy one anyway, and offer this song as a gift more love more anniversary's and happiness galore for everybody in the world and ahston kutcher and demi moore",
    mood: "Sad",
    spotify: "https://open.spotify.com/track/23KdhIaHUNdgynP3pgpgX4",
    itunes:
      "https://itunes.apple.com/ph/album/upon-seeing-twitpic-conversation-between-demi-moore/1133062645?i=1133062967",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/jesus-christ-at-christmas-time",
    tags: "Folk, Light, Silly, Famous Person, Demi Moore, Ashton Kutcher"
  },
  {
    number: 344,
    date: "2009-12-10T05:00:00.000Z",
    title: "AMC Technology",
    length: "1:00",
    inkey: "A",
    tempo: 110,
    topic: "Contest",
    location: "Berkeley ",
    instruments: "Vocals, Synths, Samples, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=cIEYj34Erls",
    description:
      "when i'm waiting on the phone to talk to a customer service rep i've been on hold for hours and i'm ready to give up i get on the line and i have to repeat myself giving all this relevant info that i've already told someone else meanwhile at the call center they're feeling overwhelmed with the holiday season upon them call volume starts to swell if only there were someway to increase efficiency so they could help customers faster so everyone's happy AMC technology connecting businesses to call centers so everybody's happy call center agents get my info automatically and when i'm happy you're happy",
    mood: "Intense",
    spotify: "https://open.spotify.com/track/3oU3hVGV71FQQvrE8bwtHj",
    itunes:
      "https://itunes.apple.com/ph/album/amc-technology/1133062645?i=1133062968",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/upon-seeing-the-twitpic-conversation-between-demi-moore-and-ashton-kutcher",
    tags: "Rock, Cheesy"
  },
  {
    number: 345,
    date: "2009-12-11T05:00:00.000Z",
    title: "Pirates Life",
    length: "2:51",
    inkey: "F#m",
    tempo: 93,
    topic: "Contest",
    location: "Berkeley ",
    instruments: "Vocals, Acoustic Guitar",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=RVTlQFxumiM",
    description:
      "goin' back i swore i wouldn't but i feel the pull is it fate is it destiny or an implanted chip in the back of my skull i thought i was done with the pirates life guess i thought wrong on the bow of the good ship gloria we'll be singing this song on the banks of that lonely isle where i was left to die a dream of an angel came she asked me why why was i marooned when i could've been the king i didn't knw what to tell her i didn't say anything it's not a life for everyone this much i understand if you like creature comforts if you like your picnics planned but the pirates life is the one for me and forever i will stand with my head held high against the tyrants who try to take our land as my ship draw near to the anchor point i sense that something's off not a sound for miles around not single seagull cough from the depths of the hungry ocean a fiery mouth appears and through rain and sleet and hail and wind all that i can heara",
    mood: "Excited",
    spotify: "https://open.spotify.com/track/571RfTvLdghKc9dzwhG70I",
    itunes:
      "https://itunes.apple.com/ph/album/pirates-life/1133062645?i=1133062969",
    bandcamp: "https://jonathanmann.bandcamp.com/track/amc-technology",
    tags: "Folk, Dark, Wistful, Rough"
  },
  {
    number: 346,
    date: "2009-12-12T05:00:00.000Z",
    title: "A Snickers Noir",
    length: "0:30",
    inkey: "D#m",
    tempo: 100,
    topic: "Contest",
    location: "Berkeley ",
    instruments: "Vocals, Synths, Samples, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=rP102gvW37M",
    description: "Noir!",
    mood: "Intense",
    spotify: "https://open.spotify.com/track/050xtq392yrhZeGhOs0yjn",
    itunes:
      "https://itunes.apple.com/ph/album/a-snickers-noir/1133062645?i=1133062970",
    bandcamp: "https://jonathanmann.bandcamp.com/track/pirates-life",
    tags: "Rock, Dark, Narrative, Food, Snickers"
  },
  {
    number: 347,
    date: "2009-12-13T05:00:00.000Z",
    title: "A Humble Plea for Database Security",
    length: "1:13",
    inkey: "F",
    tempo: 95,
    topic: "Contest",
    location: "Berkeley ",
    instruments: "Vocals, Piano, Samples, Drum Machine",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=6XU4g6tfXOg",
    description: "A song about Database Security.",
    mood: "Chill",
    spotify: "https://open.spotify.com/track/6C5w0DmO9RJhFtrXvmjklC",
    itunes:
      "https://itunes.apple.com/ph/album/a-humble-plea-for-database-security/1133062645?i=1133062971",
    bandcamp: "https://jonathanmann.bandcamp.com/track/a-snickers-noir",
    tags: "Rock, Funny, Light"
  },
  {
    number: 348,
    date: "2009-12-14T05:00:00.000Z",
    title: "So Obvious",
    length: "1:44",
    inkey: "A",
    tempo: 90,
    topic: "Poetic",
    location: "Berkeley ",
    instruments: "Vocals, Piano, Samples, Drum Machine",
    beard: "N/A",
    videoid: "https://www.youtube.com/watch?v=oSEj2bw0Cgc",
    description: "Ob-vi-ous",
    mood: "Chill",
    spotify: "https://open.spotify.com/track/3xqkUuxeeKRn47o6vpv1v1",
    itunes:
      "https://itunes.apple.com/ph/album/so-obvious/1133062645?i=1133062972",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/a-humble-plea-for-database-security",
    tags: "Electro, Dreamy, Dark, Vocoder"
  },
  {
    number: 349,
    date: "2009-12-15T05:00:00.000Z",
    title:
      "If You Piled Up Everything I Didn't Know \nWould It Be As Big As the Universe? Oh.",
    length: "2:31",
    inkey: "E",
    tempo: 112,
    topic: "Poetic",
    location: "Berkeley ",
    instruments: "Vocals, Acoustic Guitar",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=jAvJHgUiclY",
    description: "Another one made up on the spot",
    mood: "Chill",
    spotify: "https://open.spotify.com/track/4Ki5iWunPBj6py4lBXv3xa",
    itunes:
      "https://itunes.apple.com/ph/album/if-you-piled-up-everything-i-didnt-know-would-it-be/1133062645?i=1133062973",
    bandcamp: "https://jonathanmann.bandcamp.com/track/so-obvious",
    tags: "Folk, Light, Delicate, Science"
  },
  {
    number: 350,
    date: "2009-12-16T05:00:00.000Z",
    title: "Joseph isadore...Palpatine?",
    length: "1:19",
    inkey: "A",
    tempo: 86,
    topic: "Politics",
    location: "Berkeley ",
    instruments: "Vocals, Acoustic Guitar",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=fTAoSC9xXqw",
    description: "What a jerk...",
    mood: "Drunk",
    spotify: "https://open.spotify.com/track/29RpuCi6PHJF4xY5doliss",
    itunes:
      "https://itunes.apple.com/ph/album/joseph-isadore-palpatine/1133062645?i=1133062974",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/if-you-piled-up-everything-i-didnt-know-would-it-be-as-big-as-the-universe-oh",
    tags: "Folk, Political, Famous Person, Joe Lieberman, Emperor Palpatine"
  },
  {
    number: 351,
    date: "2009-12-17T05:00:00.000Z",
    title: "All My Mutant Homies (Say What!)",
    length: "3:45",
    inkey: "E",
    tempo: 74,
    topic: "Nerd",
    location: "Berkeley ",
    instruments: "Vocals, Acoustic Guitar",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=NTMePK6auh8",
    description:
      "hey girl, you're a mutant freak i wanna snuggle up to you nuzzle mutant cheek to cheek make a baby mutant ooo ooo oo for all my mutant homies i say yeah it's gonna be all right yeah hey man you're a stiff stiff collar get up offa my porch you don't wanna hear me holler or light my mutant torch hey girl you're a mutant princess i'd lay down and die for you i'd push you on the mutant swing sets in the alpha omega zoo",
    mood: "Intense",
    spotify: "https://open.spotify.com/track/2ZOmdFNP9EUIaKTMJlofo7",
    itunes:
      "https://itunes.apple.com/ph/album/all-my-mutant-homies-say-what/1133062645?i=1133062975",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/joseph-isadore-palpatine",
    tags: "Folk, Fun, Silly, Dark, Mutants"
  },
  {
    number: 352,
    date: "2009-12-18T05:00:00.000Z",
    title: "I'll Be Seeing You",
    length: "0:46",
    inkey: "D",
    tempo: 80,
    topic: "Poetic",
    location: "Berkeley ",
    instruments: "Vocals, Acoustic Guitar",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=OXXobZgS_WI",
    description:
      "the season weighs heavy on my nerves i don't have time to even sing these words i gotta go, i got stuff to do but i'll be seeing you yeah i'll be seeing you",
    mood: "Pensive",
    spotify: "https://open.spotify.com/track/3me3BPbk4FJ8ivvetQOJhx",
    itunes:
      "https://itunes.apple.com/ph/album/ill-be-seeing-you/1133062645?i=1133062976",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/all-my-mutant-homies-say-what",
    tags: "Folk, Delicate, Wistful, Good"
  },
  {
    number: 353,
    date: "2009-12-19T05:00:00.000Z",
    title: "Daylight Savings",
    length: "1:58",
    inkey: "G",
    tempo: 60,
    topic: "Poetic",
    location: "Los Angeles",
    instruments: "Vocals, Acoustic Guitar",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=Wb4P45uOPRg",
    description:
      "it gets dark so early i don't have time to do all the day time things that i need to if i were a vampire i'd love this time of year i'd take an evening stroll when the sky was clear daylight savings makes no sense give me back those hours i demand recompense i'm a morning person i never stay up late and when occasionally i do i don't feel so great so the darkness makes me sleepy and i feel like a party pooper i wish i was like mario could eat a mushroom and be super",
    mood: "Pensive",
    spotify: "https://open.spotify.com/track/08cKJiBMGLTaKGZIt7az0H",
    itunes:
      "https://itunes.apple.com/ph/album/daylight-savings/1133062645?i=1133062977",
    bandcamp: "https://jonathanmann.bandcamp.com/track/ill-be-seeing-you",
    tags: "Folk, Delicate, Wistful"
  },
  {
    number: 354,
    date: "2009-12-20T05:00:00.000Z",
    title: "Puking My Guts",
    length: "0:48",
    inkey: "D#",
    tempo: 105,
    topic: "Sick",
    location: "Los Angeles",
    instruments: "Vocals",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=ox_XSHIIwg4",
    description: "N/A",
    mood: "Sad",
    spotify: "https://open.spotify.com/track/5a2HKrc51fkFPwHLtKmqq6",
    itunes:
      "https://itunes.apple.com/ph/album/puking-my-guts/1133062645?i=1133062978",
    bandcamp: "https://jonathanmann.bandcamp.com/track/daylight-savings",
    tags: "Acapella, Funny, Food Poisoning "
  },
  {
    number: 355,
    date: "2009-12-21T05:00:00.000Z",
    title: "I'm Weak",
    length: "1:39",
    inkey: "A",
    tempo: 90,
    topic: "Sick",
    location: "Los Angeles",
    instruments: "Vocals, Acoustic Guitar",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=N2vWxFiiaWs",
    description: "i'm weak i can barely walk i'm weak",
    mood: "Sad",
    spotify: "https://open.spotify.com/track/5KwpfAsz3IUikodctZEfYE",
    itunes: "https://itunes.apple.com/ph/album/im-weak/1133062645?i=1133062979",
    bandcamp: "https://jonathanmann.bandcamp.com/track/puking-my-guts",
    tags: "Folk, Light, Food poisoning "
  },
  {
    number: 356,
    date: "2009-12-22T05:00:00.000Z",
    title: "Food Poisoning",
    length: "0:56",
    inkey: "D",
    tempo: 90,
    topic: "Sick",
    location: "Los Angeles",
    instruments: "Vocals, Acoustic Guitar",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=dwnny8P7oXM",
    description:
      "food poisoning makes you want to die food poisoning feels like stabbing yourself in the eye puking then dry heaving then fever and then chills then your body's aching because and you can't take pain relieving pills cause you have food poisoning and you don't know from whence it came food poisoning is god's sick little game",
    mood: "Pensive",
    spotify: "https://open.spotify.com/track/0iHCf6mBLZcZaVE6b9szb7",
    itunes:
      "https://itunes.apple.com/ph/album/food-poisoning/1133062645?i=1133062980",
    bandcamp: "https://jonathanmann.bandcamp.com/track/food-poisoning",
    tags: "Folk, Light, Food poisoning "
  },
  {
    number: 357,
    date: "2009-12-23T05:00:00.000Z",
    title: "I Must Be Going Crazy",
    length: "2:10",
    inkey: "Bm",
    tempo: 70,
    topic: "Poetic",
    location: "Los Angeles",
    instruments: "Vocals, Acoustic Guitar",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=zejii6xywE0",
    description: "Right?!",
    mood: "Sad",
    spotify: "https://open.spotify.com/track/0ejUus9CdTdEC8V5QB25BY",
    itunes:
      "https://itunes.apple.com/ph/album/i-must-be-going-crazy/1133062645?i=1133062981",
    bandcamp: "https://jonathanmann.bandcamp.com/track/i-must-be-going-crazy",
    tags: "Folk, Dark, Rough"
  },
  {
    number: 358,
    date: "2009-12-24T05:00:00.000Z",
    title: "Happy Christmas Adam From Melissa",
    length: "2:15",
    inkey: "A",
    tempo: 121,
    topic: "Christmas",
    location: "Los Angeles",
    instruments: "Vocals, Acoustic Guitar",
    beard: "Clean",
    videoid: "https://www.youtube.com/watch?v=WwxaShQoIUU",
    description:
      "She loves the freckle above your lip She loves your love to Edward James She loves your knowledge of movie quotes and this love I now proclaim adam, melissa loves you happy christmas adam adam, melissa loves you happy christmas adam she loves your calculator watch she loves your kindness and your talent how you imitate the beatles how you throw your head back when you laugh she loves your love of bears roar! she loves your knowledge of computers being the big nerd that you are and so i present this song may the two of you travel far",
    mood: "Happy",
    spotify: "https://open.spotify.com/track/5EkhY32iQ2nbskjzi1hqQT",
    itunes:
      "https://itunes.apple.com/ph/album/happy-christmas-adam-from-melissa/1133062645?i=1133062982",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/happy-christmas-adam-from-melissa",
    tags: "Folk, Light, Holiday, Christmas"
  },
  {
    number: 359,
    date: "2009-12-25T05:00:00.000Z",
    title: "The Story of Wandering Fall, Act 2, Scene 1: Blue Blue Oval",
    length: "0:50",
    inkey: "C",
    tempo: 165,
    topic: "Poetic",
    location: "Berkeley",
    instruments: "Vocals, Synths, Samples, Drum Machine",
    beard: "N/A",
    videoid: "https://www.youtube.com/watch?v=YeHG3_RnwN4",
    description: "www.tsowf.tumblr.com",
    mood: "Pensive",
    spotify: "https://open.spotify.com/track/7DIuExAWig3Tg6zH0PPcXr",
    itunes:
      "https://itunes.apple.com/ph/album/blue-blue-oval/1133062645?i=1133062983",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/the-story-of-wandering-fall-act-2-scene-1-blue-blue-oval",
    tags: "Electro, Narrative, Wandering Fall"
  },
  {
    number: 360,
    date: "2009-12-26T05:00:00.000Z",
    title: "The Story of Wandering Fall, Act 2, Scene 2: Monsters Rising",
    length: "0:43",
    inkey: "C",
    tempo: 120,
    topic: "Poetic",
    location: "Berkeley",
    instruments: "Vocals, Synths, Samples, Drum Machine",
    beard: "N/A",
    videoid: "https://www.youtube.com/watch?v=vL3vYiG3swI",
    description: "www.tsowf.tumblr.com",
    mood: "Intense",
    spotify: "https://open.spotify.com/track/0ZTT5dlz59eoONhfpUduzZ",
    itunes:
      "https://itunes.apple.com/ph/album/monsters-rising/1133062645?i=1133062984",
    bandcamp:
      "https://jonathanmann.bandcamp.com/track/the-story-of-wandering-fall-act-2-scene-2-monsters-rising",
    tags: "Electro, Narrative, Wandering Fall"
  },
  {
    number: 361,
    date: "2009-12-27T05:00:00.000Z",
    title: "Soldier on Blindly",
    length: "3:02",
    inkey: "F#",
    tempo: 73,
    topic: "Poetic",
    location: "Jupiter, FL",
    instruments: "Vocals, Acoustic Guitar",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=urjhYZ60GQA",
    description:
      "in the earliest of times there was nothing but void for humanities crimes i am forever employed cleaning up messes vacuuming dirt ready with the net so no one gets hurt again don't soldier on blindly iffen you find me acting unkindly my tongue is made out of fire as i strum on my lyre and attempt to inspire on the ocean floor i collect sea shells in the highest mountains i ring liberty bells down in the valley in the shady glen they hide in doors in the morning when i come a gilded knife and a child at play it was another life i threw that all away picking up pieces falling through the cracks you don't find love till you turn your back on it",
    mood: "Intense",
    spotify: "https://open.spotify.com/track/1skmOf2fXTSE8B79nKVrR8",
    itunes:
      "https://itunes.apple.com/ph/album/soldier-on-blindly/1133062645?i=1133062985",
    bandcamp: "https://jonathanmann.bandcamp.com/track/soldier-on-blindly",
    tags: "Folk, Anthem, Dark, Good"
  },
  {
    number: 362,
    date: "2009-12-28T05:00:00.000Z",
    title: "The Wrong Foot",
    length: "3:06",
    inkey: "G#",
    tempo: 69,
    topic: "Poetic",
    location: "Jupiter, FL",
    instruments: "Vocals, Baritone Uke",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=0C4SWjqNZZE",
    description:
      "wrong way down a one way tarmac made of fools flocks of chickens block the only route barnyard johnny swings his ax without a care and the chickens scatter everywhere absolutely everywhere bureaucratic automatic touch reactionary such and such slam the brake no pull the clutch it's chess no tetris double dutch oh to give me what i want you'll have to compromise just admit defeat and open up the skies to give me what i want you'll have to learn to put the truth before a shoe that's on the wrong foot heads explode while points are made and then unmade with 8 fluent oz. and a sharpened blade the chickens will step aside and watch the mighty hoard of cattle as they climb on board they climb climb on board ostentatiously and without a plan the chickens do what chickens can they try to finish what they began with increasingly half baked demands",
    mood: "Pensive",
    spotify: "https://open.spotify.com/track/20C1Dgh8wY4Pk7hIAKyOQC",
    itunes:
      "https://itunes.apple.com/ph/album/the-wrong-foot/1133062645?i=1133062986",
    bandcamp: "https://jonathanmann.bandcamp.com/track/the-wrong-foot",
    tags: "Folk, Delicate, Wistful"
  },
  {
    number: 363,
    date: "2009-12-29T05:00:00.000Z",
    title: "Time, Time, Time",
    length: "4:01",
    inkey: "C",
    tempo: 115,
    topic: "Poetic",
    location: "Jupiter, FL",
    instruments: "Vocals, Baritone Uke",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=tHoEqw_wcy0",
    description:
      "who leads the funeral procession? i need a face i can follow is there a priest who can lend a hand tonight who's the captain of this sinking ship as it's sw sw swswallowed who can make the call that'll save our lives? don't tell me that it'll be all right i hear the music playing there's liquid at the center of the earth i'm not much for fire and brimstone and that's not what i'm saying i don't know what i'm saying for whatever that's worth oh time, time, time when my body is old and decrepit who will let me lay dying who will carry me on to the other side is it grace that leads us or grace that weighs us down as we're trying our damndest to leave this world behind i never know what direction i'm going till i've start singing and it's too late then to turn and change the course I never know what kind of suitcase to pack or what kind of message i'm bringing or if i'll be riding a bike car train or horse",
    mood: "Pensive",
    spotify: "https://open.spotify.com/track/6C87sK1PpxTg9B6tb2fCu6",
    itunes:
      "https://itunes.apple.com/ph/album/time-time-time/1133062645?i=1133062987",
    bandcamp: "https://jonathanmann.bandcamp.com/track/time-time-time",
    tags: "Folk, Light"
  },
  {
    number: 364,
    date: "2009-12-30T05:00:00.000Z",
    title: "I'm Losing My Hair",
    length: "3:03",
    inkey: "G#",
    tempo: 95,
    topic: "Life",
    location: "Jupiter, FL",
    instruments: "Vocals, Baritone Uke",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=mGj4q6Q8v5Q",
    description:
      "I'm just a losing my hair male pattern baldness everywhere say good bye to these big black locks i sit and watch it fall down on to my socks oh I'm just a losing my hair it's not a question of what is fair life moves on i'll be getting some grey i think it'll make me look sophisticated oh i'm just losing my hair and all i can do is stare but don't give me products i don't need your goop i'm a take it like a man now i'm part of a troupe oh i am losing my hair and it's not exactly that i don't care but change is good so i welcome it to hold on to the past feels desperate oh",
    mood: "Sad",
    spotify: "https://open.spotify.com/track/0di888WmxpD9iawlXMbuWz",
    itunes:
      "https://itunes.apple.com/ph/album/im-losing-my-hair/1133062645?i=1133062988",
    bandcamp: "https://jonathanmann.bandcamp.com/track/im-losing-my-hair",
    tags: "Folk, Delicate, Frustrated, My Appearence"
  },
  {
    number: 365,
    date: "2009-12-31T05:00:00.000Z",
    title: "Me, I Write a Song a Day",
    length: "3:08",
    inkey: "F#",
    tempo: 93,
    topic: "Song A Day",
    location: "Jupiter, FL",
    instruments: "Vocals, Baritone Uke",
    beard: "Shadow",
    videoid: "https://www.youtube.com/watch?v=XuX8Z8sxgiQ",
    description:
      "one year ago 3000 miles away i picked up my ukelele and i started to play and every single day no matter what came my way i picked up my ukelele and i started to play some folks they try to change the world some folks go to church to pray some folks struggle to make a living me i write a song everyday one year down and many more to go i'll write about my friends and the city all aglow ill write about what i'm feeling i'll write about what i know one year down and many more to go some folks have fun at parties some folks like to listen to the DJ some folks they make a lot of money me i write a song a day one year ago in a bedroom in LA i picked up my ukulele and i started to play from the san francisco bay down to blue jay way i picked up my ukulele and i started to play some folks struggle to find meaning in a universe made of chaos and decay some folks have orchestras and power me i write a song a day",
    mood: "Pensive",
    spotify: "https://open.spotify.com/track/2iAR7mw4iiajhqhj0nxR8R",
    itunes:
      "https://itunes.apple.com/ph/album/me-i-write-a-song-a-day/1133062645?i=1133062989",
    bandcamp: "https://jonathanmann.bandcamp.com/track/me-i-write-a-song-a-day",
    tags: "Folk, Delicate, Milestone"
  }
];

const Instrument = mongoose.model("Instrument", {
  name: String,
  image: String
});
const Inkey = mongoose.model("Inkey", { name: String, image: String });
const Topic = mongoose.model("Topic", { name: String, image: String });
const Beard = mongoose.model("Beard", { name: String, image: String });
const City = mongoose.model("Location", { name: String, image: String });
const Mood = mongoose.model("Mood", { name: String, image: String });

const songTagSchema = new Schema({
  image: String,
  name: String
});

const tagSongSchema = new Schema({
  _id: Schema.Types.ObjectId,
  number: Number,
  title: String,
  date: Date,
  length: Number,
  inkey: { type: Schema.Types.ObjectId, ref: "Inkey" },
  tempo: Number,
  videoid: String,
  description: String,
  acousticproduced: String,
  mood: { type: Schema.Types.ObjectId, ref: "Mood" }
  // tags: [Models.Tag.tagSchema],
});

const Song = mongoose.model("Song", {
  number: Number,
  title: String,
  date: Date,
  length: Number,
  inkey: String,
  tempo: Number,
  topic: String,
  location: String,
  instruments: [String],
  beard: String,
  videoid: String,
  description: String,
  acousticproduced: String,
  firsts: String,
  comments: String,
  press: String,
  tagNames: [String],
  tags: [songTagSchema],
  itunes: String,
  spotify: String,
  bandcamp: String,
  mood: String,
  mainInstrument: String,
  secondaryInstrument: String
});

const Tag = mongoose.model("Tag", {
  image: String,
  name: String,
  songs: [tagSongSchema]
});

const gatherFields = array => {
  return new Promise((resolve, reject) => {
    let uniques = {
      beards: {
        name: "Beard",
        collection: []
      },
      instruments: {
        name: "Instrument",
        collection: []
      },
      locations: {
        name: "Location",
        collection: []
      },
      topics: {
        name: "Topic",
        collection: []
      },
      keys: {
        name: "Inkey",
        collection: []
      },
      tags: {
        name: "Tag",
        collection: []
      },
      moods: {
        name: "Mood",
        collection: []
      }
    };

    songList.forEach(song => {
      if (song.instruments) {
        let instruments = song.instruments
          .toLowerCase()
          .replace("\n", "")
          .split(",")
          .map(inst => {
            return inst.trim();
          });
        uniques.instruments.collection = uniques.instruments.collection.concat(
          instruments
        );
      }

      if (song.mood) {
        uniques.moods.collection.push(song.mood);
      }

      if (song.beard) {
        uniques.beards.collection.push(song.beard);
      }

      if (song.location) {
        uniques.locations.collection.push(song.location);
      }

      if (song.topic) {
        uniques.topics.collection.push(song.topic);
      }
      if (song.inkey) {
        let upcase = song.inkey
          .charAt(0)
          .toUpperCase()
          .concat(song.inkey.slice(1));
        uniques.keys.collection.push(upcase);
      }
      if (song.tags) {
        let tags = song.tags
          .toLowerCase()
          .replace("\n", "")
          .split(",")
          .map(tag => tag.trim());
        uniques.tags.collection = uniques.tags.collection.concat(tags);
      }
    });
    resolve(uniques);
  });
};

const insertUniques = obj => {
  return new Promise((resolve, reject) => {
    let keyArray = Object.keys(obj).slice();
    var uniqueBar = new ProgressBar(
      "  inserting uniques & writing out to filenames.txt [:bar] :percent",
      {
        complete: "=",
        incomplete: " ",
        width: 40,
        total: keyArray.length
      }
    );

    const recurse = array => {
      if (array.length === 0) {
        resolve();
        return;
      }
      uniqueBar.tick(1);
      let key = array.shift();
      if (key.length) {
        const dict = {};
        // let counter = 0;

        let arr = obj[key].collection;
        let identifier = obj[key].name;
        let filenamesToSort = [];

        if (identifier.toLowerCase() !== "tag") {
          fs.appendFileSync(
            "filenames.txt",
            "\n\n" + identifier + "\n********************\n",
            "utf8"
          );
        }

        for (let i = 0; i < arr.length; i++) {
          if (arr[i].trim().length) {
            let thekey;
            if (identifier === "Mood") {
              thekey = arr[i]
                .replace(/^\n|\n$/g, "")
                .trim()
                .toLowerCase();
            } else {
              thekey = arr[i].replace(/^\n|\n$/g, "").trim();
            }

            if (!dict[thekey]) {
              let filename = `${identifier.toLowerCase()}_${arr[i]
                .replace(/[_/!., ]/g, "")
                .replace("#", "-sharp")
                .replace(/^\n|\n$/g, "")
                .trim()
                .toLowerCase()}.png`;
              dict[thekey] = filename;
              filenamesToSort.push(filename);
            }
          }
        }
        if (identifier.toLowerCase() !== "tag") {
          filenamesToSort.sort();
          for (let filename of filenamesToSort) {
            fs.appendFileSync("filenames.txt", filename + "\n", "utf8");
          }
        }

        let objArray = [];
        for (let key in dict) {
          objArray.push({
            name: key,
            image: dict[key]
          });
        }

        /// write out uniques to help with spellchecking...
        let sortedArray = objArray.slice();
        sortedArray = sortedArray.map(item => {
          return item.name;
        });
        sortedArray.sort();
        for (name of sortedArray) {
          fs.appendFileSync("unique-tags.txt", name + "\n", "utf8");
        }

        const theModel = mongoose.model(identifier);
        theModel.insertMany(objArray, (err, docs) => {
          if (err) {
            reject(err);
          }
          recurse(array);
        });
      } else {
        recurse(array);
      }
    };
    recurse(keyArray);
  });
};

const calcLength = string => {
  let arr = string.split(":");
  let secs = parseInt(arr[arr.length - 1]);
  let mins = parseInt(arr[0]);
  secs = secs + mins * 60;
  return secs;
};

const insertTagsonSongsOnTags = () => {
  return new Promise((resolve, reject) => {
    Song.find({}).then(songs => {
      const len = songs.length;

      var bar = new ProgressBar("  doing tag insertion [:bar] :percent", {
        complete: "=",
        incomplete: " ",
        width: 40,
        total: len
      });

      const recurse = array => {
        if (!array.length) {
          resolve();
        } else {
          bar.tick(1);
          let song = array.shift();
          const recurseOnTags = tagArray => {
            if (!tagArray.length) {
              recurse(array);
            } else {
              let currentTag = tagArray.shift();
              Tag.find({ name: currentTag }).then(tags => {
                const tag = tags[0];
                tag.songs.push(song);
                tag.save(err => {
                  if (err) {
                    throw new Error(err);
                    reject();
                  } else {
                    song.tags.push(tag);
                    song.save(err => {
                      if (err) {
                        throw new Error(err);
                      } else {
                        recurseOnTags(tagArray);
                      }
                    });
                  }
                });
              });
            }
          };
          recurseOnTags(song.tagNames.slice());
        }
      };
      recurse(songs);
    });
  });
};

async function insertSongs(array) {
  var insertSongBar = new ProgressBar("  inserting songs [:bar] :percent", {
    complete: "=",
    incomplete: " ",
    width: 40,
    total: array.length
  });
  let records = [];
  let mainInstrument;
  let secondaryInstrument;
  for (let i = 0; i < array.length; i++) {
    insertSongBar.tick(1);
    let instruments = [];
    if (array[i].instruments) {
      let instrumentArray = array[i].instruments
        .toLowerCase()
        .replace("\n", "")
        .split(",")
        .map(inst => {
          return inst.trim();
        });

      // ignore Vocals if it's the first instrument listed among multiple
      // instrumentIndex = 0;
      // if (instrumentArray[0] === 'vocals' && instrumentArray.length > 1) {
      //   instrumentIndex = 1;
      // }

      const firstInstQuery = await Instrument.findOne({
        name: instrumentArray[0]
      }).exec();
      if (instrumentArray[1]) {
        const secondInstQuery = await Instrument.findOne({
          name: instrumentArray[1]
        });
        secondaryInstrument = secondInstQuery._id;
      }
      mainInstrument = firstInstQuery._id;

      const query = await Instrument.find({
        name: { $in: instrumentArray }
      }).exec();

      query.forEach(item => {
        instruments.push(item._id);
      });
    }

    let tempo = 0;
    if (typeof array[i].tempo === "number") {
      tempo = array[i].tempo;
    }
    let upcasedKey = undefined;
    if (array[i].inkey) {
      upcasedKey = array[i].inkey
        .charAt(0)
        .toUpperCase()
        .concat(array[i].inkey.slice(1));
      const query = await Inkey.find({ name: upcasedKey }).exec();
      upcasedKey = query[0].id;
    }

    let beard;
    if (array[i].beard) {
      const query = await Beard.find({
        name: array[i].beard.replace(/^\n|\n$/g, "").trim()
      }).exec();
      beard = query[0].id;
    }

    let location;
    if (array[i].location) {
      const query = await City.find({
        name: array[i].location.replace(/^\n|\n$/g, "").trim()
      }).exec();
      location = query[0].id;
    }

    let topic;
    if (array[i].topic) {
      const query = await Topic.find({
        name: array[i].topic.replace(/^\n|\n$/g, "").trim()
      }).exec();
      topic = query[0].id;
    }

    let date = new Date(array[i].date);

    let tagNames = [];
    if (array[i].tags) {
      tagNames = array[i].tags
        .toLowerCase()
        .replace("\n", "")
        .split(",")
        .map(tag => tag.trim())
        .filter(tag => tag.length);
    }

    let mood;
    if (array[i].mood) {
      const query = await Mood.find({
        name: array[i].mood
          .replace(/^\n|\n$/g, "")
          .trim()
          .toLowerCase()
      }).exec();
      mood = query[0].id;
    }

    let song = {
      number: array[i].number,
      title: array[i].title,
      date,
      length: calcLength(array[i].length),
      videoid: array[i].videoid.slice(-11),
      tempo,
      description: array[i].description,
      acousticproduced: array[i].acousticproduced,
      firsts: array[i].firsts,
      comments: array[i].comments,
      press: array[i].press,
      inkey: upcasedKey,
      beard,
      instruments,
      location,
      topic,
      tagNames,
      itunes: array[i].itunes,
      spotify: array[i].spotify,
      bandcamp: array[i].bandcamp,
      mood,
      mainInstrument,
      secondaryInstrument
    };
    records.push(song);
  }
  console.log(`Inserted ${records.length} songs`);
  Song.insertMany(records, (err, docs) => {
    if (err) {
      console.log(err);
    }
    console.log("inserting songs on tags and tags on songs...");
    insertTagsonSongsOnTags()
      .then(success => {
        process.exit();
      })
      .catch(error => {
        throw new Error(error);
        process.exit();
      });
  });
}

gatherFields(songList).then(results => {
  fs.writeFileSync("filenames.txt", "", "utf8");
  fs.writeFileSync("unique-tags.txt", "", "utf8");
  insertUniques(results).then(success => {
    console.log("inserted all uniques!");
    insertSongs(songList);
  });
});
