INSERT INTO roles(name) VALUES('ROLE_USER');
INSERT INTO roles(name) VALUES('ROLE_MODERATOR');
INSERT INTO roles(name) VALUES('ROLE_ADMIN');

INSERT INTO app_user (email, name, password, profile_picture_url, sign_up_date, username, id) 
VALUES ('example@example.com', 'John Doe', '$2a$10$G0qs8RfCJ2fgwB8MkE4vaeFXaXeSSEZr2zaHfwKqKKo0NR2ayxAoG', 'http://example.com/profile.jpg', CURRENT_TIMESTAMP, 'john_doe', DEFAULT);

INSERT INTO user_roles (user_id, role_id) VALUES (1, 1);

