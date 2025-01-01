import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Timer, User, Eye, EyeOff, X, RefreshCw } from "lucide-react";

const WORDS = [
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
]
;

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
    const selectedWordIndex = Math.floor(Math.random() * WORDS.length);
    setSelectedWord(WORDS[selectedWordIndex]);
    
    const spyPosition = Math.floor(Math.random() * count);
    const newCards = Array(count).fill(null).map((_, index) => ({
      id: index,
      word: index === spyPosition ? 'SPY' : WORDS[selectedWordIndex],
      revealed: false,
      disabled: false,
      confirmed: false
    }));
    
    setCards(newCards);
    setGamePhase('viewing');
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
          <h1 className="text-3xl font-bold mb-8">Spy Game</h1>
          <p className="text-xl mb-4">Select number of players:</p>
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
          <h2 className="text-xl mb-4">Take turns viewing your cards</h2>
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
              Start Game
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
          <h2 className="text-2xl mb-4">Game in Progress!</h2>
          <p className="text-center mb-8">
            Discuss and find the spy before time runs out!
          </p>
          <Button 
            onClick={resetGame}
            className="bg-red-500 hover:bg-red-600 flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Restart Game
          </Button>
        </div>
      )}

      {/* Confirmation Overlay */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center">
          <div className="text-center p-8">
            <h3 className="text-2xl mb-4">Your word is:</h3>
            <p className="text-4xl font-bold mb-8">
              {cards.find(card => card.id === activeCard)?.word}
            </p>
            <Button 
              onClick={handleConfirmation}
              className="bg-green-500 hover:bg-green-600"
            >
              I've Memorized It
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
            <h3 className="text-2xl mb-4">Pass the phone to the next player</h3>
            <p>(Tap anywhere to continue)</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;