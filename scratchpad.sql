CREATE OR REPLACE FUNCTION ranking()
RETURNS TABLE(username varchar(64))
AS
$$ SELECT
username,
cash_position,
portfolio_value
FROM users AS u
ORDER BY (u.cash_position + u.portfolio_value) $$
LANGUAGE SQL;
SELECT * FROM ranking()
WITH ordinality
AS t(username, rank)
WHERE username = '${username}';