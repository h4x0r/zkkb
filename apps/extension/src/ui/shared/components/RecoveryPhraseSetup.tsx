import { useState } from 'react'
import { Button } from '@/ui/shared/components/ui/button'
import { Card } from '@/ui/shared/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/ui/shared/components/ui/dialog'
import { generateRecoveryPhrase } from '@/infrastructure/crypto/recovery-phrase'

interface Props {
  onComplete: (phrase: string, isEvaluation: boolean) => void
}

type Step = 'choose' | 'create' | 'import' | 'evaluate'

export function RecoveryPhraseSetup({ onComplete }: Props) {
  const [step, setStep] = useState<Step>('choose')
  const [phrase, setPhrase] = useState<string>('')
  const [showEvaluationWarning, setShowEvaluationWarning] = useState(false)

  const handleCreateNew = () => {
    const newPhrase = generateRecoveryPhrase()
    setPhrase(newPhrase)
    setStep('create')
  }

  const handleSkipForNow = () => {
    setShowEvaluationWarning(true)
  }

  const handleConfirmEvaluation = () => {
    onComplete('', true) // Empty phrase for evaluation mode
  }

  if (step === 'choose') {
    return (
      <div className="p-6 space-y-4">
        <h2 className="text-2xl font-bold">Welcome to Chatham</h2>

        <div className="space-y-3">
          <Button onClick={handleCreateNew} className="w-full">
            Create New Recovery Phrase
          </Button>

          <Button onClick={() => setStep('import')} variant="outline" className="w-full">
            Import Existing Phrase
          </Button>

          <Button onClick={handleSkipForNow} variant="ghost" className="w-full">
            Skip for Now
          </Button>
        </div>

        <Dialog open={showEvaluationWarning} onOpenChange={setShowEvaluationWarning}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Evaluation Mode</DialogTitle>
              <DialogDescription asChild>
                <div className="space-y-2">
                  <p>Your data will be lost when you close the browser.</p>
                  <p>Evaluation period expires after:</p>
                  <ul className="list-disc pl-5">
                    <li>24 hours, OR</li>
                    <li>10 cards created</li>
                  </ul>
                  <p>(whichever comes first)</p>
                </div>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowEvaluationWarning(false)}>
                Cancel
              </Button>
              <Button onClick={handleConfirmEvaluation}>
                Start Evaluation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  if (step === 'create') {
    const words = phrase.split(' ')

    return (
      <div className="p-6 space-y-4">
        <h2 className="text-2xl font-bold">Your Recovery Phrase</h2>
        <p className="text-sm text-muted-foreground">
          Write these 24 words down. You'll need them to recover your data.
        </p>

        <div className="grid grid-cols-3 gap-2">
          {words.map((word, i) => (
            <div key={i} data-testid="phrase-word" className="p-2 bg-muted rounded text-center">
              {word}
            </div>
          ))}
        </div>

        <Button onClick={() => onComplete(phrase, false)}>
          I've Written This Down
        </Button>
      </div>
    )
  }

  return null
}
