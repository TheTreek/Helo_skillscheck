SELECT p.title, p.img, p.content, u.username, u.profile_pic
FROM helo_posts p
JOIN helo_users u ON p.author_id = u.id 
WHERE p.id = ${id};