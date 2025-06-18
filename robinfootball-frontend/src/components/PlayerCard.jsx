function PlayerCard({ player, variant, onBuy, onSell, onAdjust }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <strong>{player.name}</strong> – {player.team} – ${player.currentValue}

      {variant === 'market' && (
        <button
          onClick={() => onBuy?.(player)}
          disabled={player.owned}
          style={{ marginLeft: '0.5rem' }}
        >
          {player.owned ? 'Owned' : 'Buy'}
        </button>
      )}

      {variant === 'portfolio' && (
        <div style={{ marginTop: '0.5rem' }}>
          <button onClick={() => onAdjust?.(player.id, 10)}>📈 +10</button>
          <button onClick={() => onAdjust?.(player.id, -10)}>📉 -10</button>
          <button onClick={() => onSell?.(player.id)}>🗑️ Sell</button>
        </div>
      )}
    </div>
  );
}

export default PlayerCard;
