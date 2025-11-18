INSERT INTO stations(name) VALUES
  ('République'),
  ('Châtelet'),
  ('Bastille')
ON CONFLICT DO NOTHING;

INSERT INTO headways(station_id, minutes)
SELECT id, 3 FROM stations WHERE name = 'République'
UNION ALL
SELECT id, 4 FROM stations WHERE name = 'Châtelet'
UNION ALL
SELECT id, 5 FROM stations WHERE name = 'Bastille';

INSERT INTO last_metro(station_id, departed_at)
SELECT id, '00:30:00'::time FROM stations WHERE name = 'République'
UNION ALL
SELECT id, '00:25:00'::time FROM stations WHERE name = 'Châtelet'
UNION ALL
SELECT id, '00:20:00'::time FROM stations WHERE name = 'Bastille';
