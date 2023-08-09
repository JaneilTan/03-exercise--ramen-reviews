CREATE TABLE packaging_styles (
  id SERIAL PRIMARY KEY,
  packaging_style TEXT UNIQUE NOT NULL
);

INSERT INTO packaging_styles
VALUES
(1, 'Pack'),
(2, 'Bowl'),
(3, 'Cup'),
(4, 'Tray'),
(5, 'Box'),
(6, 'Bar'),
(7, 'Can'),
(8, 'Restaurant');
