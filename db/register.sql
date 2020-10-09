INSERT INTO helo_users(
    username,
    password,
    profile_pic
)VALUES(
    ${username},
    ${password},
    ${profile_pic}
);

SELECT * FROM helo_users
WHERE username = $(username);