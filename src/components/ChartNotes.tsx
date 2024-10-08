import React, { useState } from 'react'
import { ChartNote } from '../types'

const timeframes = [
  ['Weekly', 'Daily', '4hr', '1hr'],
  ['30min', '15min', '5min', '1min']
]

const ChartNotes: React.FC = () => {
  const [notes, setNotes] = useState<ChartNote[]>([])
  const [currentNote, setCurrentNote] = useState<ChartNote>({
    timeframe: '',
    note: '',
    sentiment: 'neutral',
    support: '',
    resistance: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setCurrentNote(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (currentNote.timeframe && currentNote.note) {
      setNotes([...notes, currentNote])
      setCurrentNote({
        timeframe: '',
        note: '',
        sentiment: 'neutral',
        support: '',
        resistance: '',
      })
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const items = e.clipboardData.items
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const blob = items[i].getAsFile()
        if (blob) {
          const reader = new FileReader()
          reader.onload = (e) => {
            if (e.target && typeof e.target.result === 'string') {
              setCurrentNote(prev => ({ ...prev, image: e.target.result }))
            }
          }
          reader.readAsDataURL(blob)
        }
      }
    }
  }

  const handleRemoveImage = () => {
    setCurrentNote(prev => ({ ...prev, image: undefined }))
  }

  return (
    <div className="mb-8 bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Chart Notes</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Timeframe</label>
            <div className="grid grid-cols-2 gap-4">
              {timeframes.map((column, colIndex) => (
                <div key={colIndex} className="space-y-2">
                  {column.map((tf) => (
                    <label key={tf} className="flex items-center">
                      <input
                        type="radio"
                        name="timeframe"
                        value={tf}
                        checked={currentNote.timeframe === tf}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      {tf}
                    </label>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="note" className="block mb-1">Note</label>
            <textarea
              id="note"
              name="note"
              value={currentNote.note}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              rows={3}
            ></textarea>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="sentiment" className="block mb-1">Sentiment</label>
            <select
              id="sentiment"
              name="sentiment"
              value={currentNote.sentiment}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="neutral">Neutral</option>
              <option value="bullish">Bullish</option>
              <option value="bearish">Bearish</option>
            </select>
          </div>
          <div>
            <label htmlFor="support" className="block mb-1">Support</label>
            <input
              type="number"
              id="support"
              name="support"
              value={currentNote.support}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              step="0.01"
            />
          </div>
          <div>
            <label htmlFor="resistance" className="block mb-1">Resistance</label>
            <input
              type="number"
              id="resistance"
              name="resistance"
              value={currentNote.resistance}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              step="0.01"
            />
          </div>
        </div>
        <div>
          <label htmlFor="image" className="block mb-1">Image</label>
          <div 
            className="w-full p-2 border rounded cursor-text min-h-[100px]" 
            onPaste={handlePaste}
            tabIndex={0}
          >
            {currentNote.image ? (
              <div className="relative">
                <img src={currentNote.image} alt="Pasted chart" className="max-w-full h-auto" />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            ) : (
              <p className="text-gray-400">Click here and paste image</p>
            )}
          </div>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add Note
        </button>
      </form>
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">Saved Notes</h3>
        {notes.length === 0 ? (
          <p>No notes saved yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left">Time</th>
                  <th className="p-2 text-left">Note</th>
                  <th className="p-2 text-left">Sup</th>
                  <th className="p-2 text-left">Res</th>
                  <th className="p-2 text-left">Image</th>
                </tr>
              </thead>
              <tbody>
                {notes.map((note, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2">{note.timeframe}</td>
                    <td className="p-2">{note.note}</td>
                    <td className="p-2">${parseFloat(note.support).toFixed(2)}</td>
                    <td className="p-2">${parseFloat(note.resistance).toFixed(2)}</td>
                    <td className="p-2">
                      {note.image && (
                        <img src={note.image} alt="Chart" className="max-w-xs max-h-20" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default ChartNotes