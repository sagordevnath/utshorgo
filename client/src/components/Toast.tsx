import { useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

type Listener = (message: string) => void;
let listener: Listener | null = null;

export function showToast(message: string) {
  listener?.(message);
}

export function Toast() {
  const [message, setMessage] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timer: number | undefined;
    listener = (msg) => {
      setMessage(msg);
      setVisible(true);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setVisible(false), 2200);
    };
    return () => {
      listener = null;
      window.clearTimeout(timer);
    };
  }, []);

  if (!message) return null;

  return (
    <div className={`toast ${visible ? 'show' : ''}`} role="status">
      <CheckCircle2 size={16} />
      <span>{message}</span>
    </div>
  );
}