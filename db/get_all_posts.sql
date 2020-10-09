SELECT u.username, u.profile_pic, p.title, p.id  FROM helo_posts p
JOIN helo_users u ON p.author_id = u.id
WHERE u.username != ${username}
AND p.title ILIKE CONCAT('%',${search},'%');