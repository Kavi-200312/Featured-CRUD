const dotenv = require("dotenv");
const connectDB = require("./database/Database");
const userModel = require("../models/User");

dotenv.config();

const seedUsers = [
  { name: "brian", email: "cadams50@herrera-cook.com", phone: "9680656051", address: "east matthew" },
  { name: "matthew", email: "aarongraham99@johns.com", phone: "8929021344", address: "west jessicaville" },
  { name: "rebecca", email: "davidknox91@pruitt-berry.com", phone: "6297347640", address: "monroeport" },
  { name: "matthew", email: "lorifowler89@hotmail.com", phone: "6739844569", address: "alexanderhaven" },
  { name: "ryan", email: "cbrooks87@hotmail.com", phone: "8064905059", address: "lake lori" },
  { name: "jennifer", email: "sanderssamantha83@parks.com", phone: "7383197335", address: "darrenberg" },
  { name: "jose", email: "amandaperez39@bryant.biz", phone: "7466938896", address: "robertsport" },
  { name: "jason", email: "kimberlybailey6@lawrence.com", phone: "7067384454", address: "weaverton" },
  { name: "tina", email: "melissamills26@vazquez.org", phone: "7860593792", address: "melissaborough" },
  { name: "cheryl", email: "jamesoconnor9@jensen.com", phone: "8232835290", address: "north keith" },
  { name: "rachel", email: "karenhill75@mcpherson.com", phone: "7256750045", address: "michaelmouth" },
  { name: "robert", email: "scottholloway17@robinson.biz", phone: "7252962551", address: "robertsland" },
  { name: "john", email: "rebeccaburke40@fields.com", phone: "6136892610", address: "lake brandon" },
  { name: "david", email: "billypeterson22@phillips.info", phone: "7009716815", address: "davidstad" },
  { name: "susan", email: "gomezlisa5@murphy.com", phone: "7648305095", address: "west jennifer" },
  { name: "william", email: "danamartin97@ballard.biz", phone: "7703424640", address: "new natalie" },
  { name: "heather", email: "thomasjennings16@higgins.org", phone: "9305692651", address: "port sandra" },
  { name: "tyler", email: "evan57@jenkins.com", phone: "6522324114", address: "port thomas" },
  { name: "christopher", email: "dawn38@mooney.com", phone: "9853280210", address: "jeffreyburgh" },
  { name: "ashley", email: "laurenhampton93@lynch.net", phone: "8714960989", address: "west sarah" },
  { name: "aaron", email: "michelle87@oliver.com", phone: "7559187436", address: "north megan" },
  { name: "michael", email: "cristina66@evans.info", phone: "8701459342", address: "port thomasfort" },
  { name: "steven", email: "ashley32@nguyen.com", phone: "9472739484", address: "feliciaville" },
  { name: "paul", email: "ashleyweber3@brady.com", phone: "6509435944", address: "east saramouth" },
  { name: "stephanie", email: "courtneymcneil60@palmer.com", phone: "9780226849", address: "new scottborough" },
  { name: "alexis", email: "samanthawall91@floyd.com", phone: "9067801784", address: "port anitamouth" },
  { name: "karen", email: "shawna47@conway.com", phone: "6678508267", address: "port kathryn" },
  { name: "mark", email: "timmathis43@carr.com", phone: "9694013452", address: "north lindsay" },
  { name: "daniel", email: "charlesfranklin61@oneill.com", phone: "7319641633", address: "dianamouth" },
  { name: "brandon", email: "michaelcrawford57@blake.biz", phone: "7279829805", address: "west kimberlyshire" },
  { name: "megan", email: "kaylawagner92@monroe.info", phone: "9300412045", address: "travisport" },
  { name: "andrew", email: "schneidergina8@stone.org", phone: "6812482524", address: "east stephenport" },
  { name: "rebecca", email: "scottcoleman67@park.org", phone: "7093362279", address: "new annestad" },
  { name: "cynthia", email: "matthew98@moore.com", phone: "9608024078", address: "troyland" },
  { name: "sean", email: "peterfrancis23@carter.org", phone: "9378129810", address: "paulport" },
  { name: "victoria", email: "brownjessica11@maxwell.com", phone: "8668290506", address: "samanthafort" },
  { name: "lisa", email: "gail04@robbins.org", phone: "9041169271", address: "michelleside" },
  { name: "timothy", email: "marksmith54@oliver.com", phone: "7411597125", address: "kelseytown" },
  { name: "amanda", email: "william99@hoffman.com", phone: "9631603601", address: "south lindsey" },
  { name: "dennis", email: "smithkaren66@cabrera.com", phone: "6793717236", address: "joshuatown" },
  { name: "dylan", email: "theresaeaton52@hunt.biz", phone: "6893024596", address: "chelseatown" },
  { name: "karen", email: "kevinfleming76@hansen.com", phone: "7723521449", address: "lewisstad" },
  { name: "brandon", email: "zachary11@moses.com", phone: "6829142339", address: "port katherine" },
  { name: "michelle", email: "zacharyfox37@ryan.org", phone: "7591308212", address: "johnsonhaven" },
  { name: "rachel", email: "michaeljohnston20@campbell.info", phone: "7262780421", address: "chelseamouth" },
  { name: "heather", email: "briannaberry17@baxter.biz", phone: "6539200415", address: "lisaport" },
  { name: "victoria", email: "tiffany09@russell.com", phone: "9764867752", address: "kevinport" },
  { name: "steven", email: "brownrobin5@martin.com", phone: "9362643695", address: "samanthafort" },
  { name: "kathryn", email: "luke36@edwards.com", phone: "6107946591", address: "weaverville" },
  { name: "kenneth", email: "danielhogan97@turner.info", phone: "6226374741", address: "south adamborough" }
];


const seedDatabase = async () => {
    try {
        await connectDB();

        await userModel.insertMany(seedUsers);
        console.log("Database seeded successfully");
    } catch (error) {
        console.error("Error seeding database:", error);
    }
};

// Call the function
seedDatabase();