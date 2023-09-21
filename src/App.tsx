import './App.css'
import { Synth } from './Synth'

function App() {
  return (
    <div>
      <h1>browser synth experiments</h1>
      <p>This is a brief experiment with browser audio APIs. I'll keep adding to it, and will use a lot from the MDN examples.
        Right now this is a keyboard synth, with 1 main AudioContext and 1 OscillatorNode and GainNode per key, which might be the
        wrong way to go about this as far as performance is concerned.
      </p>
      <p>Built with react and vite. <a href='https://github.com/bheftel/browser-synth/' target='_blank' rel="noopener noreferrer">See GitHub.</a></p>
      <Synth release={1} />
    </div>
  )
}

export default App
