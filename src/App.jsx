import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'

// Floating hearts background component
function FloatingHearts() {
  const hearts = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 15,
    duration: 15 + Math.random() * 10,
    size: 20 + Math.random() * 30,
  }))

  const emojis = ['💕', '🌈', '✨', '💖', '🏳️‍🌈', '💜']

  return (
    <div className="hearts-bg">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="floating-heart"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
          }}
        >
          {emojis[heart.id % emojis.length]}
        </div>
      ))}
    </div>
  )
}

// Sparkles component
function Sparkles({ count = 20 }) {
  const sparkles = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 2,
    size: 10 + Math.random() * 15,
  }))

  return (
    <>
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          className="absolute text-yellow-300 sparkle pointer-events-none"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            fontSize: `${s.size}px`,
            animationDelay: `${s.delay}s`,
          }}
        >
          ✨
        </motion.div>
      ))}
    </>
  )
}

// Sassy intro text
function SassyIntro() {
  return (
    <motion.div
      className="text-center mb-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <motion.p
        className="text-valentine-blush/70 text-sm mb-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        *clears throat*
      </motion.p>
      <motion.p
        className="text-valentine-blush/60 text-xs italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        (yes i know valentine's day is a corporate scam but you're worth being scammed for so here we are)
      </motion.p>
    </motion.div>
  )
}

// The panicking NO button
function NoButton({ onTrapped }) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [messages] = useState([
    "DON'T EVEN THINK ABOUT IT",
    "I'M NOT AN OPTION!!",
    "WRONG ANSWER BESTIE",
    "absolutely not",
    "this is homophobic",
    "I'M CALLING THE POLICE",
  ])
  const [currentMessage, setCurrentMessage] = useState(0)
  const [isTrapped, setIsTrapped] = useState(false)

  useEffect(() => {
    if (isTrapped) return

    const interval = setInterval(() => {
      setPosition({
        x: (Math.random() - 0.5) * 300,
        y: (Math.random() - 0.5) * 200,
      })
      setCurrentMessage((prev) => (prev + 1) % messages.length)
    }, 800)

    const trapTimeout = setTimeout(() => {
      setIsTrapped(true)
      onTrapped()
    }, 6000)

    return () => {
      clearInterval(interval)
      clearTimeout(trapTimeout)
    }
  }, [isTrapped])

  if (isTrapped) {
    return (
      <motion.div
        className="relative"
        initial={{ scale: 1, rotate: 0 }}
        animate={{ scale: 0.6, rotate: [0, -10, 10, -10, 0] }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative bg-gray-800 rounded-lg p-6 border-4 border-gray-600">
          <div className="absolute inset-0 flex justify-around px-2 pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="jail-bar w-2 h-full" />
            ))}
          </div>

          <motion.button
            className="relative z-10 px-12 py-6 bg-gray-500 text-white rounded-xl font-bold opacity-50 text-2xl"
            animate={{ y: [0, -3, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            No
            <motion.span
              className="absolute -top-8 left-1/2 -translate-x-1/2 text-2xl"
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              😢
            </motion.span>
          </motion.button>
        </div>

        <motion.div
          className="absolute -right-16 top-0 text-2xl"
          initial={{ x: 0, y: 0, rotate: 0 }}
          animate={{ x: 50, y: -100, rotate: 360, opacity: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          🔑
        </motion.div>

        <motion.p
          className="text-gray-400 text-sm mt-2 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          *dramatically threw away the key*
        </motion.p>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="relative"
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 100, damping: 10 }}
    >
      <motion.button
        className="px-12 py-6 bg-gray-600 text-white rounded-xl font-bold shadow-lg relative text-2xl"
        animate={{
          rotate: [0, -15, 15, -15, 15, 0],
          scale: [1, 0.9, 1.1, 0.9, 1],
        }}
        transition={{ repeat: Infinity, duration: 0.5 }}
        whileHover={{ scale: 1.5, x: Math.random() * 200 - 100 }}
      >
        No
        <motion.span
          className="absolute -top-6 left-1/2 -translate-x-1/2 text-xl"
          animate={{ rotate: [0, 20, -20, 0] }}
          transition={{ repeat: Infinity, duration: 0.3 }}
        >
          😰
        </motion.span>
      </motion.button>

      <motion.div
        className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white px-3 py-2 rounded-lg shadow-lg whitespace-nowrap"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        key={currentMessage}
      >
        <span className="text-gray-800 text-sm font-bold">{messages[currentMessage]}</span>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white" />
      </motion.div>
    </motion.div>
  )
}

// The runaway YES button - now with chase game!
function RunawayYesButton({ onCaught, noTrapped }) {
  const [chasePhase, setChasePhase] = useState(0)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef(null)

  const chaseMessages = [
    { text: "come get me 😏", subtext: "if you can..." },
    { text: "too slow, babe!", subtext: "gotta be quicker than that" },
    { text: "ooh you really want this huh?", subtext: "i like the energy" },
    { text: "okay okay almost...", subtext: "just a little more" },
    { text: "fine, you win 💕", subtext: "but only because you're cute" },
  ]

  const positions = [
    { x: 0, y: 0 },      // center
    { x: -150, y: -120 }, // top left
    { x: 150, y: -100 },  // top right
    { x: -120, y: 100 },  // bottom left
    { x: 0, y: 0 },       // back to center for capture
  ]

  const handleMouseEnter = () => {
    if (!noTrapped) return // Don't run until NO is trapped

    if (chasePhase < 4) {
      setChasePhase(prev => prev + 1)
      setPosition(positions[chasePhase + 1])
    }
  }

  const handleClick = () => {
    if (!noTrapped) return

    if (chasePhase >= 4) {
      onCaught()
    } else {
      // If they manage to click early, still advance the chase
      setChasePhase(prev => Math.min(prev + 1, 4))
      setPosition(positions[Math.min(chasePhase + 1, 4)])
    }
  }

  return (
    <motion.div
      className="relative"
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <motion.button
        className="px-12 py-6 bg-gradient-to-r from-valentine-pink to-valentine-rose text-white rounded-xl font-bold shadow-lg glow text-2xl relative"
        animate={noTrapped ? {
          scale: [1, 1.05, 1],
        } : {
          rotate: [0, -5, 5, -5, 5, 0],
        }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        whileHover={{ scale: chasePhase >= 4 ? 1.1 : 1 }}
        whileTap={{ scale: 0.95 }}
        onMouseEnter={handleMouseEnter}
        onClick={handleClick}
      >
        Yes
        {!noTrapped && (
          <motion.span
            className="absolute -top-8 -right-4 text-3xl"
            animate={{ rotate: [0, 20, 0, 20, 0] }}
            transition={{ repeat: Infinity, duration: 0.6 }}
          >
            👋
          </motion.span>
        )}
      </motion.button>

      {/* Chase messages */}
      {noTrapped && (
        <motion.div
          className="absolute -top-20 left-1/2 -translate-x-1/2 text-center whitespace-nowrap"
          key={chasePhase}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-valentine-pink font-bold text-lg">{chaseMessages[chasePhase].text}</p>
          <p className="text-valentine-blush/70 text-sm">{chaseMessages[chasePhase].subtext}</p>
        </motion.div>
      )}

      {!noTrapped && (
        <motion.span
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm text-valentine-blush whitespace-nowrap"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          ← psst... over here
        </motion.span>
      )}

      {/* Progress dots for chase */}
      {noTrapped && chasePhase < 4 && (
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-1">
          {[0, 1, 2, 3, 4].map(i => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${i <= chasePhase ? 'bg-valentine-pink' : 'bg-white/30'}`}
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}

// Challenge 1: Rate how cute Marlee is (rigged slider)
function Challenge1({ onComplete }) {
  const [value, setValue] = useState(10)
  const [attempts, setAttempts] = useState(0)
  const [message, setMessage] = useState("Rate how cute Marlee is")

  const handleChange = (e) => {
    const newVal = parseInt(e.target.value)
    if (newVal < 10) {
      setAttempts(prev => prev + 1)
      if (attempts === 0) setMessage("Nice try... that slider is gay it only goes one way 🏳️‍🌈")
      else if (attempts === 1) setMessage("bestie i SAID what i SAID. 10 only. 💅")
      else setMessage("you're stuck with a 10, embrace it")
    }
    setValue(10)
  }

  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
    >
      <h2 className="text-3xl font-fancy text-valentine-pink mb-8 glow-text">{message}</h2>

      <div className="relative w-80 mx-auto mb-8">
        <div className="flex justify-between mb-2 text-valentine-blush">
          <span>1</span>
          <span>10</span>
        </div>
        <input
          type="range"
          min="1"
          max="10"
          value={value}
          onChange={handleChange}
          className="w-full"
        />
        <motion.div
          className="text-6xl mt-4"
          key={value}
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
        >
          {value === 10 ? "💯" : "🤔"}
        </motion.div>
      </div>

      <motion.p
        className="text-valentine-blush mb-6"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        Current rating: {value}/10 (the only correct answer)
      </motion.p>

      <motion.button
        className="px-8 py-3 bg-gradient-to-r from-valentine-pink to-valentine-rose text-white rounded-full font-bold shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onComplete}
      >
        fine, 10 it is 💕
      </motion.button>
    </motion.div>
  )
}

// Challenge 2: Catch the hearts mini-game
function Challenge2({ onComplete }) {
  const [caught, setCaught] = useState(0)
  const [hearts, setHearts] = useState([])
  const target = 5

  const heartEmojis = ['💖', '💕', '🌈', '✨', '💜', '🏳️‍🌈']
  const encouragements = [
    "yasss get them!",
    "serving heart-catcher realness",
    "u-haul energy activated",
    "that's gay keep going",
    "slay!"
  ]

  useEffect(() => {
    const spawnHeart = () => {
      const id = Date.now()
      const heart = {
        id,
        x: Math.random() * 80 + 10,
        y: Math.random() * 60 + 20,
        emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)]
      }
      setHearts(prev => [...prev, heart])

      setTimeout(() => {
        setHearts(prev => prev.filter(h => h.id !== id))
      }, 2000)
    }

    const interval = setInterval(spawnHeart, 600)
    return () => clearInterval(interval)
  }, [])

  const catchHeart = (id) => {
    setHearts(prev => prev.filter(h => h.id !== id))
    setCaught(prev => {
      const newCount = prev + 1
      if (newCount >= target) {
        setTimeout(onComplete, 500)
      }
      return newCount
    })
  }

  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
    >
      <h2 className="text-3xl font-fancy text-valentine-pink mb-2 glow-text">
        Catch my love! 💕
      </h2>
      <p className="text-valentine-blush mb-2">click the hearts before they disappear!</p>
      <motion.p
        className="text-valentine-blush/60 text-sm mb-4 italic"
        key={caught}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {caught > 0 ? encouragements[Math.min(caught - 1, encouragements.length - 1)] : "(this is very lesbian of us)"}
      </motion.p>

      <div className="flex justify-center gap-2 mb-4">
        {[...Array(target)].map((_, i) => (
          <motion.span
            key={i}
            className="text-3xl"
            initial={{ scale: 0 }}
            animate={{ scale: i < caught ? 1 : 0.5, opacity: i < caught ? 1 : 0.3 }}
          >
            💖
          </motion.span>
        ))}
      </div>

      <div className="relative w-80 h-64 mx-auto bg-white/5 rounded-2xl border border-valentine-pink/30 overflow-hidden">
        <AnimatePresence>
          {hearts.map((heart) => (
            <motion.button
              key={heart.id}
              className="absolute text-4xl cursor-pointer hover:scale-125 transition-transform"
              style={{ left: `${heart.x}%`, top: `${heart.y}%` }}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              whileHover={{ scale: 1.3 }}
              onClick={() => catchHeart(heart.id)}
            >
              {heart.emoji}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      <p className="text-valentine-blush mt-4">{caught}/{target} hearts caught</p>
    </motion.div>
  )
}

// Challenge 3: The fence/boat story question
function Challenge3({ onComplete }) {
  const [selected, setSelected] = useState(null)
  const [showResponse, setShowResponse] = useState(false)

  const options = [
    { text: "i'd jump a hundred fences for you 🏃‍♀️", response: "that's my girl 💕" },
    { text: "only if there's hot chocolate after ☕", response: "deal. i'll bring the thermos, you bring the vibes 😘" },
    { text: "i'd sneak into a thousand boats with you 🚤", response: "best date ever and i will die on this hill" },
    { text: "babe i'd commit CRIMES for you", response: "that's the queer energy i fell for 🏳️‍🌈" },
  ]

  const handleSelect = (index) => {
    setSelected(index)
    setShowResponse(true)
    setTimeout(onComplete, 2500)
  }

  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
    >
      <h2 className="text-3xl font-fancy text-valentine-pink mb-2 glow-text">
        remember our third date? 🥺
      </h2>
      <p className="text-valentine-blush/70 text-sm mb-2 italic">
        (jumping fences, sneaking onto that boat, drinking hot chocolate like the criminals we are)
      </p>
      <p className="text-valentine-blush mb-6 text-lg">would you do it all again?</p>

      <div className="flex flex-col gap-4 max-w-md mx-auto">
        {options.map((option, index) => (
          <motion.button
            key={index}
            className={`px-6 py-4 rounded-xl font-medium text-left transition-all ${
              selected === index
                ? 'bg-valentine-pink text-white'
                : 'bg-white/10 text-valentine-blush hover:bg-white/20'
            }`}
            whileHover={{ scale: 1.02, x: 10 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelect(index)}
            disabled={selected !== null}
          >
            {option.text}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {showResponse && selected !== null && (
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-2xl text-valentine-pink font-fancy">
              {options[selected].response}
            </p>
            <motion.div
              className="text-4xl mt-4"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              💕
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// Challenge 4: Vulnerable storytelling moment (NEW - replaces "I love Marlee")
function Challenge4({ onComplete }) {
  const [stage, setStage] = useState(0)

  const messages = [
    {
      text: "okay real talk for a second...",
      subtext: null,
      emoji: "🥺"
    },
    {
      text: "i'm kinda scared too, you know?",
      subtext: "like... feelings are terrifying",
      emoji: "😅"
    },
    {
      text: "but here's the thing sophie...",
      subtext: "every time i'm with you, the fear gets quieter",
      emoji: "💕"
    },
    {
      text: "you make me feel brave enough to be soft",
      subtext: "and that's the most lesbian thing i've ever said",
      emoji: "🏳️‍🌈"
    },
    {
      text: "so yeah... i made you this whole dramatic website",
      subtext: "because you deserve someone who's gonna be extra for you",
      emoji: "✨"
    },
  ]

  const goBack = () => {
    if (stage > 0) setStage(prev => prev - 1)
  }

  const goNext = () => {
    if (stage < messages.length - 1) setStage(prev => prev + 1)
  }

  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={stage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mb-8"
        >
          <motion.div
            className="text-6xl mb-4"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            {messages[stage].emoji}
          </motion.div>
          <h2 className="text-2xl md:text-3xl font-fancy text-valentine-pink mb-2 glow-text">
            {messages[stage].text}
          </h2>
          {messages[stage].subtext && (
            <p className="text-valentine-blush/80 text-lg">
              {messages[stage].subtext}
            </p>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Progress dots */}
      <div className="flex justify-center gap-2 mb-6">
        {messages.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all ${
              i <= stage ? 'bg-valentine-pink' : 'bg-white/30'
            }`}
          />
        ))}
      </div>

      {/* Navigation arrows */}
      <div className="flex justify-center items-center gap-6 mb-6">
        <motion.button
          className={`px-6 py-3 rounded-full font-bold text-lg transition-all ${
            stage > 0
              ? 'bg-white/20 text-valentine-blush hover:bg-white/30'
              : 'bg-white/5 text-white/30 cursor-not-allowed'
          }`}
          whileHover={stage > 0 ? { scale: 1.05 } : {}}
          whileTap={stage > 0 ? { scale: 0.95 } : {}}
          onClick={goBack}
          disabled={stage === 0}
        >
          ← back
        </motion.button>

        {stage < messages.length - 1 ? (
          <motion.button
            className="px-6 py-3 bg-gradient-to-r from-valentine-pink to-valentine-rose text-white rounded-full font-bold text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={goNext}
          >
            next →
          </motion.button>
        ) : (
          <motion.button
            className="px-6 py-3 bg-gradient-to-r from-valentine-pink via-purple-500 to-valentine-rose text-white rounded-full font-bold text-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onComplete}
          >
            okay i'm crying 🥺💕
          </motion.button>
        )}
      </div>

      <p className="text-valentine-blush/50 text-sm italic">
        (take your time, reread if you need to 💕)
      </p>
    </motion.div>
  )
}

// Victory screen
function VictoryScreen() {
  useEffect(() => {
    const duration = 5 * 1000
    const end = Date.now() + duration

    // Pride + valentine colors!
    const colors = ['#FF6B9D', '#FF4081', '#FFC1CC', '#ff69b4', '#ff1493', '#E40303', '#FF8C00', '#FFED00', '#008026', '#24408E', '#732982']

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      })
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }
    frame()

    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: colors
    })
  }, [])

  return (
    <motion.div
      className="text-center px-4"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <Sparkles count={30} />

      <motion.div
        className="text-8xl mb-6"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        🏳️‍🌈💕
      </motion.div>

      <motion.h1
        className="text-5xl md:text-6xl font-fancy text-valentine-pink mb-6 glow-text"
        initial={{ y: 50 }}
        animate={{ y: 0 }}
      >
        SHE SAID YES!
      </motion.h1>

      <motion.p
        className="text-valentine-blush/70 text-sm mb-6 italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        (we're basically u-hauling at this point let's be real)
      </motion.p>

      <motion.div
        className="max-w-lg mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-valentine-pink/30"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-xl text-valentine-blush mb-4">
          Sophie...
        </p>
        <p className="text-lg text-white/90 leading-relaxed mb-4">
          from jumping fences like useless lesbians who forgot how gates work,
          to sneaking onto that boat and drinking hot chocolate like we owned the place...
        </p>
        <p className="text-lg text-white/90 leading-relaxed mb-4">
          every adventure with you makes me feel like the main character in our own little love story.
        </p>
        <p className="text-lg text-white/90 leading-relaxed mb-4">
          you make my heart beat like an amapiano drop 🎵
        </p>
        <p className="text-lg text-white/90 leading-relaxed mb-4">
          and honestly? i don't need valentine's day to tell you you're my favorite person.
          <br />
          <span className="text-valentine-blush/70 text-sm italic">(but i will use it as an excuse to be dramatic)</span>
        </p>
        <p className="text-2xl font-fancy text-valentine-pink mt-6">
          Happy Valentine's Day, my love 💕
        </p>
        <p className="text-lg text-valentine-blush mt-4">
          - your fence-jumping, boat-sneaking, hot-chocolate-drinking partner in crime
          <br />
          <span className="font-fancy text-xl">Marlee 🚤☕💕</span>
        </p>
      </motion.div>

      <motion.div
        className="mt-8 flex justify-center gap-4 text-4xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {['🏳️‍🌈', '💕', '✨', '💖', '🌈'].map((emoji, i) => (
          <motion.span
            key={i}
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              delay: i * 0.2,
            }}
          >
            {emoji}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  )
}

// Main App
export default function App() {
  const [scene, setScene] = useState('intro')
  const [noTrapped, setNoTrapped] = useState(false)
  const [yesCaught, setYesCaught] = useState(false)
  const [challengeIndex, setChallengeIndex] = useState(0)

  const handleYesCaught = () => {
    setYesCaught(true)
  }

  const handleChallengeComplete = () => {
    if (challengeIndex < 3) {
      setChallengeIndex(prev => prev + 1)
    } else {
      setScene('victory')
    }
  }

  const challenges = [
    <Challenge1 key="c1" onComplete={handleChallengeComplete} />,
    <Challenge2 key="c2" onComplete={handleChallengeComplete} />,
    <Challenge3 key="c3" onComplete={handleChallengeComplete} />,
    <Challenge4 key="c4" onComplete={handleChallengeComplete} />,
  ]

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <FloatingHearts />

      <div className="relative z-10 w-full max-w-2xl mx-auto p-4">
        <AnimatePresence mode="wait">
          {scene === 'intro' && !yesCaught && (
            <motion.div
              key="intro"
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
            >
              <motion.h1
                className="text-5xl md:text-7xl font-fancy text-valentine-pink mb-2 glow-text"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                Hey Sophie...
              </motion.h1>

              <SassyIntro />

              <motion.p
                className="text-2xl md:text-3xl text-valentine-blush mb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Will you be my Valentine? 💕
              </motion.p>

              <div className="flex justify-center items-center gap-8 flex-wrap min-h-[200px]">
                <RunawayYesButton onCaught={handleYesCaught} noTrapped={noTrapped} />
                <NoButton onTrapped={() => setNoTrapped(true)} />
              </div>

              {noTrapped && !yesCaught && (
                <motion.p
                  className="text-valentine-blush mt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  looks like there's only one option now... but you gotta catch it first 😏
                </motion.p>
              )}
            </motion.div>
          )}

          {scene === 'intro' && yesCaught && (
            <motion.div
              key="challenge-wrapper"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Not so fast message */}
              {challengeIndex === 0 && (
                <motion.div
                  className="text-center mb-8"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  <p className="text-2xl text-valentine-blush">
                    not so fast, cutie 😏
                  </p>
                  <p className="text-lg text-valentine-blush/70 mt-2">
                    you gotta prove you're worthy first...
                  </p>
                  <p className="text-sm text-valentine-blush/50 mt-1 italic">
                    (just a few totally normal challenges, nothing weird)
                  </p>
                </motion.div>
              )}

              {/* Progress dots */}
              <div className="flex justify-center gap-2 mb-8">
                {[0, 1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className={`w-3 h-3 rounded-full ${
                      i < challengeIndex
                        ? 'bg-valentine-pink'
                        : i === challengeIndex
                        ? 'bg-valentine-rose'
                        : 'bg-white/20'
                    }`}
                    animate={i === challengeIndex ? { scale: [1, 1.3, 1] } : {}}
                    transition={{ repeat: Infinity, duration: 1 }}
                  />
                ))}
              </div>

              <AnimatePresence mode="wait">
                {challenges[challengeIndex]}
              </AnimatePresence>
            </motion.div>
          )}

          {scene === 'victory' && <VictoryScreen key="victory" />}
        </AnimatePresence>
      </div>
    </div>
  )
}
