-- MySQL Test Data for Rice Shop Application

-- Clear existing data (if any)
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE refresh_tokens;
TRUNCATE TABLE order_items;
TRUNCATE TABLE orders;
TRUNCATE TABLE cart_items;
TRUNCATE TABLE carts;
TRUNCATE TABLE products;
TRUNCATE TABLE rice_types;
TRUNCATE TABLE origins;
TRUNCATE TABLE users;
SET FOREIGN_KEY_CHECKS = 1;

-- Insert Users
INSERT INTO users (username, password, email, full_name, role, created_at, updated_at) VALUES
-- Admin user with bcrypt-hashed password '123456'
('admin', '$2a$10$0OPXvM2MIZ.BK7VEUXFqjeQ6oSpBUGn9vC5MSOKbwc4vZYT0uLPGa', 'admin@riceshop.com', 'Admin User', 'ROLE_ADMIN', NOW(), NOW()),
-- Regular users with bcrypt-hashed password '123456'
('johnsmith', '$2a$10$0OPXvM2MIZ.BK7VEUXFqjeQ6oSpBUGn9vC5MSOKbwc4vZYT0uLPGa', 'john.smith@example.com', 'John Smith', 'ROLE_USER', NOW(), NOW()),
('janedoe', '$2a$10$0OPXvM2MIZ.BK7VEUXFqjeQ6oSpBUGn9vC5MSOKbwc4vZYT0uLPGa', 'jane.doe@example.com', 'Jane Doe', 'ROLE_USER', NOW(), NOW()),
('robertjohnson', '$2a$10$0OPXvM2MIZ.BK7VEUXFqjeQ6oSpBUGn9vC5MSOKbwc4vZYT0uLPGa', 'robert.johnson@example.com', 'Robert Johnson', 'ROLE_USER', NOW(), NOW()),
('sarahliu', '$2a$10$0OPXvM2MIZ.BK7VEUXFqjeQ6oSpBUGn9vC5MSOKbwc4vZYT0uLPGa', 'sarah.liu@example.com', 'Sarah Liu', 'ROLE_USER', NOW(), NOW()),
('michaelwong', '$2a$10$0OPXvM2MIZ.BK7VEUXFqjeQ6oSpBUGn9vC5MSOKbwc4vZYT0uLPGa', 'michael.wong@example.com', 'Michael Wong', 'ROLE_USER', NOW(), NOW());

-- Insert Origins
INSERT INTO origins (name, description, country_code, created_at, updated_at, is_active) VALUES
                                                                                             ('Thailand', 'Thailand is known for producing some of the world\'s finest rice, particularly jasmine rice which is prized for its aroma and soft texture. The country\'s fertile central plains and abundant water resources create ideal growing conditions.', 'TH', NOW(), NOW(), TRUE),
                                                                                             ('India', 'India is one of the world\'s largest rice producers with a rich variety of rice types grown across different regions, from the aromatic basmati in the north to the red rice varieties in the south.', 'IN', NOW(), NOW(), TRUE),
('Japan', 'Japanese rice is known for its sticky, short grain variety that pairs perfectly with Japanese cuisine. The rice is typically grown in terraced paddies with careful attention to water management.', 'JP', NOW(), NOW(), TRUE),
('Vietnam', 'Vietnam is a major rice exporter known for both its aromatic and everyday rice varieties. The Mekong Delta region is particularly famous for its rich soils and ideal growing conditions.', 'VN', NOW(), NOW(), TRUE),
('United States', 'The United States produces high-quality rice primarily in states like Arkansas, California, Louisiana, Mississippi, Missouri, and Texas. American rice includes long, medium, and short grain varieties.', 'US', NOW(), NOW(), TRUE),
('Italy', 'Italy is famous for its risotto rice varieties such as Arborio, Carnaroli, and Vialone Nano. These short-grain rice types are ideal for creamy risotto dishes due to their high starch content.', 'IT', NOW(), NOW(), TRUE),
('China', 'China has thousands of years of rice cultivation history and produces various types from fragrant rice to glutinous varieties. Rice cultivation spans from the Yangtze River valley to southern provinces.', 'CN', NOW(), NOW(), TRUE),
('Spain', 'Spanish rice growing is centered around Valencia, where varieties perfect for paella are cultivated in coastal wetlands. Bomba rice is particularly prized for paella.', 'ES', NOW(), NOW(), TRUE),
('Australia', 'Australian rice is grown primarily in New South Wales and produces high-yield, high-quality medium grain varieties. The industry is known for its sustainable practices and water efficiency.', 'AU', NOW(), NOW(), FALSE);

-- Insert Rice Types
INSERT INTO rice_types (name, description, created_at, updated_at, is_active) VALUES
('Gạo Bắc Hương', 'Là loại gạo đặc sản của Nam Định, hạt gạo nhỏ dài, màu trắng, dẻo nhiều, có độ dính. Khi nấu có mùi thơm, cơm để nguội vẫn giữ được độ dẻo và mùi thơm.', NOW(), NOW(), TRUE),
('Gạo Nàng Xuân', 'Loại gạo được các chuyên gia của Việt Nam lai tạo giữa hai giống lúa Tám Xoan và KhaoDawk Mali cho ra hạt cơm mềm dẻo ngọt cơm và có mùi thơm đặc trưng.', NOW(), NOW(), TRUE),
('Gạo ST24', 'Gạo ST24 có hạt dài trắng tinh, dẻo, có mùi thơm dứa được nhiều người tiêu dùng ưa chuộng, nhiều năm liền là gạo ngon nhất trong các hội thi cấp tỉnh, cấp vùng.', NOW(), NOW(), TRUE),
('Gạo hữu cơ', 'Gạo hữu cơ được sản xuất trong quy trình canh tác sạch từ khâu thu hoạch cho đến đóng gói bao bì chỉn chu, chặt chẽ để đảm bảo đạt chất lượng, tiêu chuẩn tốt nên rất tốt cho những ai đang tập luyện cơ thể', NOW(), NOW(), TRUE),
('Gạo thơm dứa 64', 'Gạo 64 tuy là giống gạo Việt khá lâu đời nhưng hiện tại vẫn giữ được nhiều ưu điểm vượt trội, được nhiều gia đình tin dùng.', NOW(), NOW(), TRUE),
('Gạo thơm Nàng Sen', 'Là loại gạo được các nhà hàng, khách sạn 5 sao chọn lựa để tạo nên các món ăn khác nhau nhờ vào sự thơm ngon được hấp thụ của vùng đất phù sa màu mỡ của đồng bằng sông Mekong.', NOW(), NOW(), TRUE),
('Gạo sữa Mai Vàng', 'Hương thơm tinh tế, dịu ngọt vị khi ăn, hạt cơm nở đẹp, đều khi nấu chín là những ưu điểm của dòng gạo này', NOW(), NOW(), TRUE),
('Gạo tám xoan', 'Là loại gạo có mùi thơm đặc biệt, hạt gạo nhỏ dài, kích thước đều đặn nhau. Một năm chỉ trồng và sản xuất được một vụ mùa nên đó cũng là lý do loại gạo này trở nên quý giá và đắt đỏ hơn. ', NOW(), NOW(), TRUE),
('Gạo nếp cái hoa vàng', 'Loại gạo này được xem là đặc sản của các tỉnh miền Bắc Việt Nam. Với chất lượng gạo to tròn, béo múp, màu sắc trắng ngà, có độ bám dính cao, dẻo thơm, ngon miệng', NOW(), NOW(), TRUE),
('Gạo Tám Thái đỏ', 'Chất lượng gạo từ lâu đã được nhiều người tiêu dùng yêu thích. Gạo có hương thơm ngon đặc biệt và độ dẻo mềm ngon miệng. Ngoài ra, nó còn có hàm lượng dinh dưỡng cao, tốt cho sức khỏe người dùng.', NOW(), NOW(), TRUE),
('Gạo Lài thơm', 'Một loại gạo hạt dài nổi tiếng với hương thơm của hoa và kết cấu hơi dính khi nấu chín. Phổ biến trong ẩm thực Thái Lan.', NOW(), NOW(), TRUE),
('Gạo hạt dài Ấn Độ', 'Một loại gạo thơm hạt dài có hương vị bùi và mùi thơm đặc trưng. Gạo vẫn tách rời và tơi xốp khi nấu chín.', NOW(), NOW(), TRUE),
('Gạo vùng Arborio', 'Một loại gạo hạt ngắn có hàm lượng tinh bột cao, lý tưởng để chế biến các món cơm risotto béo ngậy của Ý.', NOW(), NOW(), TRUE),
('Gạo lứt', 'Gạo nguyên hạt chưa xay xát vẫn giữ nguyên lớp cám, giúp gạo có nhiều chất dinh dưỡng hơn với hương vị bùi hơn và kết cấu dai hơn.', NOW(), NOW(), TRUE),
('Gạo nếp', 'Còn được gọi là gạo nếp, loại gạo hạt ngắn này rất dẻo khi nấu chín và thường được dùng trong các món tráng miệng và món ăn châu Á.', NOW(), NOW(), TRUE),
('Gạo Nhật', 'Một loại gạo Nhật hạt ngắn, dẻo khi nấu chín, thích hợp để làm sushi cuộn và các món ăn Nhật khác.', NOW(), NOW(), TRUE),
('Gạo lứt đen', 'Còn được gọi là gạo cấm, giống gạo này có màu đen sẫm, hương vị bùi và giá trị dinh dưỡng cao.', NOW(), NOW(), TRUE),
('Gạo lứt huyết rồng', 'Một loại gạo có lớp cám màu đỏ, có hương vị bùi và nhiều chất dinh dưỡng hơn gạo trắng.', NOW(), NOW(), TRUE),
('Gạo hoang', 'Thực ra không phải gạo mà là hạt cỏ, gạo hoang có kết cấu dai và hương vị đậm đà, thơm mùi đất', NOW(), NOW(), TRUE),
('Gạo Bomba', 'Một loại gạo hạt ngắn của Tây Ban Nha có thể hấp thụ chất lỏng gấp ba lần thể tích của nó mà vẫn giữ được độ săn chắc, lý tưởng cho món cơm thập cẩm paella.', NOW(), NOW(), TRUE),
('Gạo Carnaroli', 'Thường được gọi là "vua của các loại gạo", giống gạo Ý này được đánh giá cao vì có thể làm ra món cơm risotto béo ngậy mà vẫn giữ được hình dạng.', NOW(), NOW(), FALSE);

-- First, make sure we have user IDs
SET @admin_id = (SELECT id FROM users WHERE username = 'admin' LIMIT 1);

-- Insert Products - note we use @admin_id instead of hardcoded 1
INSERT INTO products (name, description, price, stock_quantity, image_url, origin, rice_type, weight, created_at, updated_at, created_by, is_active) VALUES
('Premium Thai Jasmine Rice', 'Premium grade jasmine rice from Thailand\'s central plains. Known for its delicate floral aroma and soft texture when cooked.', 12.99, 150, 'https://example.com/images/thai-jasmine.jpg', 'Thailand', 'Jasmine Rice', '2 kg', NOW(), NOW(), @admin_id, TRUE),
                                                                                             ('Organic Indian Basmati Rice', 'Certified organic basmati rice from the foothills of the Himalayas. Aged for 12 months to enhance flavor and aroma.', 15.99, 120, 'https://example.com/images/indian-basmati.jpg', 'India', 'Basmati Rice', '1 kg', NOW(), NOW(), @admin_id, TRUE),
                                                                                             ('Italian Arborio Risotto Rice', 'Authentic Italian Arborio rice perfect for creamy risotto dishes. Grown in the Po Valley region of Italy.', 8.99, 80, 'https://example.com/images/italian-arborio.jpg', 'Italy', 'Arborio Rice', '500 g', NOW(), NOW(), @admin_id, TRUE),
                                                                                             ('Whole Grain Brown Rice', 'Nutritious whole grain rice that retains its bran layer. Rich in fiber and minerals with a pleasant nutty flavor.', 7.99, 200, 'https://example.com/images/brown-rice.jpg', 'United States', 'Brown Rice', '1 kg', NOW(), NOW(), @admin_id, TRUE),
                                                                                             ('Thai Sticky Rice', 'Traditional Thai glutinous rice, perfect for both sweet and savory dishes. Becomes delightfully sticky when cooked.', 9.99, 100, 'https://example.com/images/sticky-rice.jpg', 'Thailand', 'Sticky Rice', '1 kg', NOW(), NOW(), @admin_id, TRUE),
                                                                                             ('Premium Japanese Sushi Rice', 'High-quality short-grain rice specially cultivated for sushi making. Perfectly sticky when cooked.', 14.99, 80, 'https://example.com/images/sushi-rice.jpg', 'Japan', 'Sushi Rice', '1 kg', NOW(), NOW(), @admin_id, TRUE),
                                                                                             ('Chinese Black Rice', 'Ancient variety known as "forbidden rice" due to its rarity. Rich in antioxidants with a distinctive nutty flavor.', 11.99, 60, 'https://example.com/images/black-rice.jpg', 'China', 'Black Rice', '500 g', NOW(), NOW(), @admin_id, TRUE),
                                                                                             ('Vietnamese Red Rice', 'Nutritious red rice from the Mekong Delta with a rustic flavor and pleasant chewy texture.', 10.99, 70, 'https://example.com/images/red-rice.jpg', 'Vietnam', 'Red Rice', '750 g', NOW(), NOW(), @admin_id, TRUE),
                                                                                             ('American Wild Rice Blend', 'Premium blend of wild rice with long grain rice. Perfect for side dishes and stuffings.', 13.99, 90, 'https://example.com/images/wild-rice.jpg', 'United States', 'Wild Rice', '500 g', NOW(), NOW(), @admin_id, TRUE),
                                                                                             ('Spanish Bomba Paella Rice', 'Traditional Spanish rice specifically for paella. Absorbs flavors while maintaining its shape when cooked.', 16.99, 50, 'https://example.com/images/bomba-rice.jpg', 'Spain', 'Bomba Rice', '1 kg', NOW(), NOW(), @admin_id, TRUE),
                                                                                             ('Family Size Jasmine Rice', 'Large family pack of premium Thai jasmine rice at an economical price. Perfect for regular household use.', 25.99, 65, 'https://example.com/images/family-jasmine.jpg', 'Thailand', 'Jasmine Rice', '5 kg', NOW(), NOW(), @admin_id, TRUE),
                                                                                             ('Organic Brown Basmati Rice', 'Organic whole grain basmati rice. Combines the aromatic qualities of basmati with the nutritional benefits of brown rice.', 14.99, 85, 'https://example.com/images/brown-basmati.jpg', 'India', 'Basmati Rice', '1 kg', NOW(), NOW(), @admin_id, TRUE),
                                                                                             ('Italian Carnaroli Risotto Rice', 'Premium carnaroli rice from Italy, known as the "king of rice" for luxury risotto dishes.', 12.99, 0, 'https://example.com/images/carnaroli.jpg', 'Italy', 'Carnaroli Rice', '500 g', NOW(), NOW(), @admin_id, FALSE);

-- Create carts for users (using variables to ensure we reference existing users)
SET @john_id = (SELECT id FROM users WHERE username = 'johnsmith' LIMIT 1);
SET @jane_id = (SELECT id FROM users WHERE username = 'janedoe' LIMIT 1);
SET @robert_id = (SELECT id FROM users WHERE username = 'robertjohnson' LIMIT 1);
SET @sarah_id = (SELECT id FROM users WHERE username = 'sarahliu' LIMIT 1);

INSERT INTO carts (user_id, total_amount, updated_at) VALUES
                                                          (@john_id, 0, NOW()),  -- John Smith
                                                          (@jane_id, 0, NOW()),  -- Jane Doe
                                                          (@robert_id, 0, NOW()),  -- Robert Johnson
                                                          (@sarah_id, 0, NOW());  -- Sarah Liu

-- Get Jane's cart ID and product IDs
SET @jane_cart_id = (SELECT id FROM carts WHERE user_id = @jane_id LIMIT 1);
SET @jasmine_rice_id = (SELECT id FROM products WHERE name = 'Premium Thai Jasmine Rice' LIMIT 1);
SET @sushi_rice_id = (SELECT id FROM products WHERE name = 'Premium Japanese Sushi Rice' LIMIT 1);

-- Add items to Jane's cart
INSERT INTO cart_items (cart_id, product_id, quantity, unit_price, subtotal) VALUES
                                                                                 (@jane_cart_id, @jasmine_rice_id, 2, 12.99, 25.98),   -- Jane has Thai Jasmine Rice in cart
                                                                                 (@jane_cart_id, @sushi_rice_id, 1, 14.99, 14.99);   -- Jane has Japanese Sushi Rice in cart

-- Update Jane's cart total
UPDATE carts SET total_amount = 40.97 WHERE id = @jane_cart_id;

-- Create some orders using variables to ensure we reference existing users
INSERT INTO orders (user_id, order_date, total_amount, status, shipping_address, billing_address, phone_number, payment_method, payment_status, tracking_number, delivery_date, updated_at, notes) VALUES
-- John's completed order
(@john_id, DATE_SUB(NOW(), INTERVAL 15 DAY), 38.97, 'DELIVERED', '123 Main St, Apt 4B, New York, NY 10001', '123 Main St, Apt 4B, New York, NY 10001', '212-555-1234', 'CREDIT_CARD', TRUE, 'USP1234567890', DATE_SUB(NOW(), INTERVAL 10 DAY), NOW(), 'Please leave at the door'),
-- Jane's processing order
(@jane_id, DATE_SUB(NOW(), INTERVAL 3 DAY), 40.97, 'PROCESSING', '456 Park Ave, Boston, MA 02115', '456 Park Ave, Boston, MA 02115', '617-555-9876', 'PAYPAL', TRUE, NULL, NULL, NOW(), NULL),
-- Robert's canceled order
(@robert_id, DATE_SUB(NOW(), INTERVAL 10 DAY), 25.98, 'CANCELLED', '789 Pine St, San Francisco, CA 94109', '789 Pine St, San Francisco, CA 94109', '415-555-4321', 'CREDIT_CARD', FALSE, NULL, NULL, NOW(), 'Ordered the wrong type of rice'),
-- Robert's new pending order
(@robert_id, DATE_SUB(NOW(), INTERVAL 1 DAY), 16.99, 'PENDING', '789 Pine St, San Francisco, CA 94109', '789 Pine St, San Francisco, CA 94109', '415-555-4321', 'CREDIT_CARD', FALSE, NULL, NULL, NOW(), NULL),
-- Sarah's shipped order
(@sarah_id, DATE_SUB(NOW(), INTERVAL 5 DAY), 50.97, 'SHIPPED', '101 Lake St, Chicago, IL 60601', '101 Lake St, Chicago, IL 60601', '312-555-7890', 'CREDIT_CARD', TRUE, 'USP9876543210', NULL, NOW(), 'Gift - please wrap nicely');

-- Get product IDs
SET @sticky_rice_id = (SELECT id FROM products WHERE name = 'Thai Sticky Rice' LIMIT 1);
SET @arborio_rice_id = (SELECT id FROM products WHERE name = 'Italian Arborio Risotto Rice' LIMIT 1);
SET @basmati_rice_id = (SELECT id FROM products WHERE name = 'Organic Indian Basmati Rice' LIMIT 1);
SET @black_rice_id = (SELECT id FROM products WHERE name = 'Chinese Black Rice' LIMIT 1);
SET @wild_rice_id = (SELECT id FROM products WHERE name = 'American Wild Rice Blend' LIMIT 1);
SET @bomba_rice_id = (SELECT id FROM products WHERE name = 'Spanish Bomba Paella Rice' LIMIT 1);

-- Store the order IDs in variables
SET @john_order_id = (SELECT id FROM orders WHERE user_id = @john_id AND status = 'DELIVERED' LIMIT 1);
SET @jane_order_id = (SELECT id FROM orders WHERE user_id = @jane_id AND status = 'PROCESSING' LIMIT 1);
SET @robert_cancelled_id = (SELECT id FROM orders WHERE user_id = @robert_id AND status = 'CANCELLED' LIMIT 1);
SET @robert_pending_id = (SELECT id FROM orders WHERE user_id = @robert_id AND status = 'PENDING' LIMIT 1);
SET @sarah_order_id = (SELECT id FROM orders WHERE user_id = @sarah_id AND status = 'SHIPPED' LIMIT 1);

-- Add order items
-- John's order items
INSERT INTO order_items (order_id, product_id, quantity, unit_price, subtotal) VALUES
                                                                                   (@john_order_id, @jasmine_rice_id, 2, 12.99, 25.98),  -- 2x Thai Jasmine Rice
                                                                                   (@john_order_id, @arborio_rice_id, 1, 8.99, 8.99),    -- 1x Arborio Rice
                                                                                   (@john_order_id, @sticky_rice_id, 1, 9.99, 4.00);     -- 0.4kg of Sticky Rice (partial amount)

-- Jane's order items (currently being processed)
INSERT INTO order_items (order_id, product_id, quantity, unit_price, subtotal) VALUES
                                                                                   (@jane_order_id, @jasmine_rice_id, 2, 12.99, 25.98),  -- 2x Thai Jasmine Rice
                                                                                   (@jane_order_id, @sushi_rice_id, 1, 14.99, 14.99);   -- 1x Japanese Sushi Rice

-- Robert's canceled order
INSERT INTO order_items (order_id, product_id, quantity, unit_price, subtotal) VALUES
    (@robert_cancelled_id, @jasmine_rice_id, 2, 12.99, 25.98);  -- 2x Thai Jasmine Rice

-- Robert's new pending order
INSERT INTO order_items (order_id, product_id, quantity, unit_price, subtotal) VALUES
    (@robert_pending_id, @bomba_rice_id, 1, 16.99, 16.99);  -- 1x Spanish Bomba Rice

-- Sarah's shipped order
INSERT INTO order_items (order_id, product_id, quantity, unit_price, subtotal) VALUES
                                                                                   (@sarah_order_id, @basmati_rice_id, 2, 15.99, 31.98),   -- 2x Indian Basmati Rice
                                                                                   (@sarah_order_id, @black_rice_id, 1, 11.99, 11.99),   -- 1x Black Rice
                                                                                   (@sarah_order_id, @wild_rice_id, 1, 13.99, 7.00);  -- 0.5kg of Wild Rice Blend (partial amount)
ALTER TABLE products AUTO_INCREMENT = 1;
ALTER TABLE users AUTO_INCREMENT = 1;