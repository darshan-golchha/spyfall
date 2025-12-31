import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Timer, User, Eye, EyeOff, X, RefreshCw, Languages } from "lucide-react";

const WORDS_ENGLISH = [
  "Apple", "Banana", "Bread", "Cake", "Candy", "Carrot", "Cheese", "Chocolate", "Cookie", "Egg",
  "Fish", "Grapes", "Honey", "Ice", "Juice", "Lemon", "Milk", "Noodles", "Orange", "Pancake",
  "Pear", "Pizza", "Popcorn", "Rice", "Salad", "Sandwich", "Soup", "Sugar", "Tea", "Tomato",
  "Water", "Yogurt", "Burger", "Fries", "Pasta", "Steak", "Sushi", "Waffle", "Mango", "Berry",
  "Beach", "Castle", "City", "Desert", "Forest", "Garden", "Home", "Island", "Market", "Mountain",
  "Park", "School", "Shop", "Temple", "Village", "Zoo", "Library", "Station", "Farm", "River",
  "Bridge", "Church", "Tower", "Harbor", "Lake", "Palace", "Airport", "Playground", "Square", "Museum",
  "Street", "Cave", "Camp", "Cabin", "Hut", "Meadow", "Valley", "Pier", "Highway", "Tunnel",

  "Dance", "Draw", "Jump", "Laugh", "Run", "Sing", "Sleep", "Swim", "Walk", "Clap",
  "Paint", "Read", "Play", "Write", "Ride", "Cook", "Build", "Climb", "Skate", "Cycle",
  "Surf", "Ski", "Jog", "Fish", "Fly", "Clean", "Garden", "Shop", "Bake", "Draw",
  "Listen", "Chat", "Study", "Exercise", "Stretch", "Knit", "Hike", "Wash", "Work", "Relax",
  
  "Book", "Chair", "Clock", "Cloud", "Cup", "Door", "Flag", "Flower", "Gift", "Glass",
  "Hat", "Key", "Lamp", "Leaf", "Mirror", "Pencil", "Phone", "Plant", "Plate", "Ring",
  "Rope", "Shoe", "Star", "Stone", "Table", "Tree", "Watch", "Window", "Basket", "Brush",
  "Ball", "Bell", "Bottle", "Bowl", "Bucket", "Can", "Fan", "Fence", "Fork", "Gate",
  "Jar", "Knife", "Ladder", "Mat", "Net", "Paper", "Picture", "Scarf", "Sign", "Umbrella",

  "Rain", "Snow", "Wind", "Sun", "Star", "Moon", "Sky", "Sea", "Wave", "Rock",
  "Sand", "Grass", "Hill", "Tree", "Bush", "Flower", "Leaf", "River", "Stream", "Lake",
  "Cloud", "Storm", "Fog", "Rainbow", "Dew", "Ice", "Dust", "Fire", "Ash", "Mud",
  "Shell", "Pebble", "Wood", "Breeze", "Spring", "Fall", "Winter", "Summer", "Autumn", "Light",
  
  "Movie", "Music", "Game", "Sport", "Show", "Song", "Story", "Theater", "Puzzle", "Toy",
  "Circus", "Carnival", "Concert", "Festival", "Magic", "Dance", "Band", "Video", "Cartoon", "Adventure",
  "Race", "Parade", "Drama", "Comedy", "Ball", "Race", "Opera", "Race", "Riddle", "Fireworks",

  "Animal", "Bird", "Cat", "Dog", "Fish", "Frog", "Horse", "Lion", "Mouse", "Rabbit",
  "Tiger", "Whale", "Butterfly", "Bee", "Ant", "Snake", "Shark", "Duck", "Goat", "Sheep",
  "Train", "Car", "Bike", "Boat", "Plane", "Bus", "Balloon", "Rocket", "Ship", "Truck",
  "Bag", "Box", "Toy", "Drum", "Horn", "Gift", "Hat", "Scarf", "Ring", "Clock",
];

const WORDS_HINDI = [
  "सेब", "केला", "रोटी", "केक", "मिठाई", "गाजर", "पनीर", "चॉकलेट", "बिस्किट", "अंडा",
  "मछली", "अंगूर", "शहद", "बर्फ", "जूस", "नींबू", "दूध", "नूडल्स", "संतरा", "पैनकेक",
  "नाशपाती", "पिज्जा", "पॉपकॉर्न", "चावल", "सलाद", "सैंडविच", "सूप", "चीनी", "चाय", "टमाटर",
  "पानी", "दही", "बर्गर", "फ्राइज", "पास्ता", "स्टेक", "सुशी", "वैफल", "आम", "बेरी",
  "समुद्र तट", "किला", "शहर", "रेगिस्तान", "जंगल", "बगीचा", "घर", "द्वीप", "बाजार", "पहाड़",
  "पार्क", "स्कूल", "दुकान", "मंदिर", "गाँव", "चिड़ियाघर", "पुस्तकालय", "स्टेशन", "खेत", "नदी",
  "पुल", "गिरजाघर", "मीनार", "बंदरगाह", "झील", "महल", "हवाई अड्डा", "खेल का मैदान", "चौक", "संग्रहालय",
  "सड़क", "गुफा", "शिविर", "झोपड़ी", "कुटिया", "मैदान", "घाटी", "घाट", "राजमार्ग", "सुरंग",

  "नृत्य", "ड्रा", "कूद", "हँसी", "दौड़", "गाना", "सोना", "तैरना", "चलना", "ताली",
  "पेंट", "पढ़ना", "खेलना", "लिखना", "सवारी", "खाना बनाना", "बनाना", "चढ़ना", "स्केट", "साइकिल",
  "सर्फ", "स्की", "जॉग", "मछली पकड़ना", "उड़ना", "साफ करना", "बागवानी", "खरीदारी", "बेक करना", "ड्रा",
  "सुनना", "चैट", "अध्ययन", "व्यायाम", "खिंचाव", "बुनाई", "पदयात्रा", "धोना", "काम", "आराम",
  
  "किताब", "कुर्सी", "घड़ी", "बादल", "कप", "दरवाजा", "झंडा", "फूल", "उपहार", "गिलास",
  "टोपी", "चाबी", "दीपक", "पत्ता", "दर्पण", "पेंसिल", "फोन", "पौधा", "प्लेट", "अंगूठी",
  "रस्सी", "जूता", "तारा", "पत्थर", "मेज", "पेड़", "घड़ी", "खिड़की", "टोकरी", "ब्रश",
  "गेंद", "घंटी", "बोतल", "कटोरा", "बाल्टी", "डिब्बा", "पंखा", "बाड़", "कांटा", "गेट",
  "जार", "चाकू", "सीढ़ी", "चटाई", "जाल", "कागज", "तस्वीर", "दुपट्टा", "चिन्ह", "छाता",

  "बारिश", "बर्फ", "हवा", "सूरज", "तारा", "चाँद", "आसमान", "समुद्र", "लहर", "चट्टान",
  "रेत", "घास", "पहाड़ी", "पेड़", "झाड़ी", "फूल", "पत्ता", "नदी", "नाला", "झील",
  "बादल", "तूफान", "कोहरा", "इंद्रधनुष", "ओस", "बर्फ", "धूल", "आग", "राख", "कीचड़",
  "खोल", "कंकड़", "लकड़ी", "हल्की हवा", "वसंत", "पतझड़", "सर्दी", "गर्मी", "शरद", "प्रकाश",
  
  "फिल्म", "संगीत", "खेल", "खेल", "शो", "गीत", "कहानी", "रंगमंच", "पहेली", "खिलौना",
  "सर्कस", "मेला", "संगीत कार्यक्रम", "त्योहार", "जादू", "नृत्य", "बैंड", "वीडियो", "कार्टून", "साहसिक",
  "दौड़", "परेड", "नाटक", "कॉमेडी", "गेंद", "दौड़", "ओपेरा", "दौड़", "पहेली", "आतिशबाजी",

  "जानवर", "पक्षी", "बिल्ली", "कुत्ता", "मछली", "मेंढक", "घोड़ा", "शेर", "चूहा", "खरगोश",
  "बाघ", "व्हेल", "तितली", "मधुमक्खी", "चींटी", "साँप", "शार्क", "बतख", "बकरी", "भेड़",
  "ट्रेन", "कार", "बाइक", "नाव", "विमान", "बस", "गुब्बारा", "रॉकेट", "जहाज", "ट्रक",
  "बैग", "बॉक्स", "खिलौना", "ड्रम", "हॉर्न", "उपहार", "टोपी", "दुपट्टा", "अंगूठी", "घड़ी",
];

const TRANSLATIONS = {
  en: {
    spy: 'SPY',
    title: 'Spy Game',
    selectPlayers: 'Select number of players:',
    takeTurns: 'Take turns viewing your cards',
    startGame: 'Start Game',
    gameInProgress: 'Game in Progress!',
    discussAndFind: 'Discuss and find the spy before time runs out!',
    restartGame: 'Restart Game',
    yourWordIs: 'Your word is:',
    memorized: "I've Memorized It",
    passPhone: 'Pass the phone to the next player',
    tapToContinue: '(Tap anywhere to continue)',
  },
  hi: {
    spy: 'जासूस',
    title: 'जासूस खेल',
    selectPlayers: 'खिलाड़ियों की संख्या चुनें:',
    takeTurns: 'बारी-बारी से अपने कार्ड देखें',
    startGame: 'खेल शुरू करें',
    gameInProgress: 'खेल चल रहा है!',
    discussAndFind: 'समय खत्म होने से पहले जासूस को खोजें!',
    restartGame: 'फिर से शुरू करें',
    yourWordIs: 'आपका शब्द है:',
    memorized: 'मैंने याद कर लिया',
    passPhone: 'फोन अगले खिलाड़ी को दें',
    tapToContinue: '(जारी रखने के लिए कहीं भी टैप करें)',
  }
};

const App = () => {
  const [playerCount, setPlayerCount] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedWord, setSelectedWord] = useState('');
  const [showOverlay, setShowOverlay] = useState(false);
  const [timer, setTimer] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [gamePhase, setGamePhase] = useState('setup'); // setup, viewing, playing
  const [activeCard, setActiveCard] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [language, setLanguage] = useState('en'); // en or hi
  
  const WORDS = language === 'en' ? WORDS_ENGLISH : WORDS_HINDI;
  const t = TRANSLATIONS[language];

  const resetGame = () => {
    setPlayerCount(0);
    setGameStarted(false);
    setCards([]);
    setSelectedWord('');
    setShowOverlay(false);
    setTimer(0);
    setTimerRunning(false);
    setGamePhase('setup');
    setActiveCard(null);
    setShowConfirmation(false);
  };

  const initializeGame = (count) => {
    setPlayerCount(count);
    const currentWords = language === 'en' ? WORDS_ENGLISH : WORDS_HINDI;
    const selectedWordIndex = Math.floor(Math.random() * currentWords.length);
    setSelectedWord(currentWords[selectedWordIndex]);
    
    const spyPosition = Math.floor(Math.random() * count);
    const newCards = Array(count).fill(null).map((_, index) => ({
      id: index,
      word: index === spyPosition ? t.spy : currentWords[selectedWordIndex],
      revealed: false,
      disabled: false,
      confirmed: false
    }));
    
    setCards(newCards);
    setGamePhase('viewing');
  };
  
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  };

  const handleCardFlip = (cardId) => {
    if (gamePhase === 'viewing' && !showConfirmation) {
      setActiveCard(cardId);
      setShowConfirmation(true);
    }
  };

  const handleConfirmation = () => {
    setShowConfirmation(false);
    setCards(cards.map(card => 
      card.id === activeCard ? { ...card, revealed: false, disabled: true, confirmed: true } : card
    ));
    setShowOverlay(true);
    setActiveCard(null);
  };

  const startGame = () => {
    setGamePhase('playing');
    setTimerRunning(true);
    setTimer(playerCount * 60);
  };

  useEffect(() => {
    let interval;
    if (timerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timer]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen min-w-screen p-8 bg-gradient-to-b from-purple-900 to-indigo-900 text-white">
      {/* Setup Phase */}
      {gamePhase === 'setup' && (
        <div className="flex flex-col items-center gap-4 pt-8">
          <div className="flex items-center gap-4 mb-8">
            <h1 className="text-3xl font-bold">{t.title}</h1>
            <Button
              onClick={toggleLanguage}
              className="bg-white/10 hover:bg-white/20 p-3"
              title="Toggle Language"
            >
              <Languages className="w-5 h-5 mr-2" />
              {language === 'en' ? 'हिन्दी' : 'English'}
            </Button>
          </div>
          <p className="text-xl mb-4">{t.selectPlayers}</p>
          <div className="grid grid-cols-2 gap-4">
            {[3, 4, 5, 6, 7, 8].map(num => (
              <Button
                key={num}
                onClick={() => initializeGame(num)}
                className="bg-white/10 hover:bg-white/20 text-xl p-6"
              >
                <User className="mr-2" /> {num}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Card Viewing Phase */}
      {gamePhase === 'viewing' && (
        <div className="flex flex-col items-center">
          <h2 className="text-xl mb-4">{t.takeTurns}</h2>
          <div className="grid grid-cols-2 gap-4 w-full max-w-md">
            {cards.map((card, index) => (
              <Card 
                key={index}
                className={`aspect-[3/4] ${
                  card.disabled ? 'opacity-50' : 'cursor-pointer hover:scale-105 transition-transform'
                }`}
                onClick={() => !card.disabled && handleCardFlip(card.id)}
              >
                <CardContent className="flex items-center justify-center h-full">
                  {card.confirmed ? (
                    <X size={48} className="text-gray-500" />
                  ) : activeCard === card.id ? (
                    <p className="text-2xl font-bold text-center">{card.word}</p>
                  ) : (
                    <EyeOff size={48} className="text-gray-500" />
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          {cards.every(card => card.confirmed) && (
            <Button 
              onClick={startGame}
              className="mt-8 bg-green-500 hover:bg-green-600"
            >
              {t.startGame}
            </Button>
          )}
        </div>
      )}

      {/* Playing Phase */}
      {gamePhase === 'playing' && (
        <div className="flex flex-col items-center mt-64">
          <div className="fixed top-4 right-4 bg-white/10 p-4 rounded-full">
            <div className="flex items-center gap-2">
              <Timer />
              <span className="text-2xl font-mono">{formatTime(timer)}</span>
            </div>
          </div>
          <h2 className="text-2xl mb-4">{t.gameInProgress}</h2>
          <p className="text-center mb-8">
            {t.discussAndFind}
          </p>
          <Button 
            onClick={resetGame}
            className="bg-red-500 hover:bg-red-600 flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            {t.restartGame}
          </Button>
        </div>
      )}

      {/* Confirmation Overlay */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center">
          <div className="text-center p-8">
            <h3 className="text-2xl mb-4">{t.yourWordIs}</h3>
            <p className="text-4xl font-bold mb-8">
              {cards.find(card => card.id === activeCard)?.word}
            </p>
            <Button 
              onClick={handleConfirmation}
              className="bg-green-500 hover:bg-green-600"
            >
              {t.memorized}
            </Button>
          </div>
        </div>
      )}

      {/* Pass to Next Player Overlay */}
      {showOverlay && (
        <div 
          className="fixed inset-0 bg-black/90 flex items-center justify-center"
          onClick={() => setShowOverlay(false)}
        >
          <div className="text-center p-8">
            <h3 className="text-2xl mb-4">{t.passPhone}</h3>
            <p>{t.tapToContinue}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
