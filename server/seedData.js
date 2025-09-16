/* global process */
import * as dotenv from "dotenv";
import User from "./mongodb/models/user.js";
import Property from "./mongodb/models/property.js";
import connectDB from "./mongodb/connect.js";

dotenv.config();

// Sample user data
const users = [
    {
        name: "John Smith",
        email: "john.smith@example.com",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
        name: "Sarah Johnson",
        email: "sarah.johnson@example.com",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
        name: "Michael Chen",
        email: "michael.chen@example.com",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
        name: "Emily Davis",
        email: "emily.davis@example.com",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
        name: "David Wilson",
        email: "david.wilson@example.com",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    },
    {
        name: "Lisa Anderson",
        email: "lisa.anderson@example.com",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
    }
];

// Sample property data
const properties = [
    {
        title: "Modern Downtown Apartment",
        description: "Stunning 2-bedroom apartment in the heart of downtown with panoramic city views. Features include hardwood floors, stainless steel appliances, and a private balcony. Walking distance to restaurants, shopping, and public transportation.",
        propertyType: "Apartment",
        location: "New York, NY",
        price: 3500,
        photo: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop"
    },
    {
        title: "Luxury Beachfront Villa",
        description: "Spectacular 4-bedroom villa with direct beach access. This property offers breathtaking ocean views, a private pool, and elegant furnishings throughout. Perfect for vacation rentals or permanent residence.",
        propertyType: "Villa",
        location: "Miami, FL",
        price: 8500,
        photo: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop"
    },
    {
        title: "Cozy Suburban House",
        description: "Charming 3-bedroom family home in a quiet neighborhood. Features a large backyard, updated kitchen, and two-car garage. Great schools nearby and close to parks and shopping centers.",
        propertyType: "House",
        location: "Austin, TX",
        price: 2200,
        photo: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop"
    },
    {
        title: "Executive Office Space",
        description: "Premium office space in a prestigious business district. 2,500 sq ft with modern amenities, conference rooms, and 24/7 security. Ideal for growing businesses and professional services.",
        propertyType: "Office",
        location: "San Francisco, CA",
        price: 12000,
        photo: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop"
    },
    {
        title: "Mountain Cabin Retreat",
        description: "Rustic 2-bedroom cabin nestled in the mountains. Perfect getaway with fireplace, hot tub, and hiking trails nearby. Fully furnished and ready for immediate occupancy.",
        propertyType: "Cabin",
        location: "Aspen, CO",
        price: 4200,
        photo: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop"
    },
    {
        title: "Urban Loft Studio",
        description: "Trendy loft-style studio in the arts district. High ceilings, exposed brick walls, and large windows. Perfect for young professionals or artists. Close to galleries, cafes, and nightlife.",
        propertyType: "Studio",
        location: "Portland, OR",
        price: 1800,
        photo: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop"
    },
    {
        title: "Waterfront Penthouse",
        description: "Exclusive penthouse with 360-degree city and water views. 3 bedrooms, 3 bathrooms, private elevator access, and rooftop terrace. The epitome of luxury living.",
        propertyType: "Penthouse",
        location: "Seattle, WA",
        price: 15000,
        photo: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop"
    },
    {
        title: "Historic Brownstone",
        description: "Beautifully restored 19th-century brownstone with original architectural details. 4 bedrooms, 3 bathrooms, and a private garden. Located in a prestigious historic district.",
        propertyType: "Townhouse",
        location: "Boston, MA",
        price: 6500,
        photo: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop"
    },
    {
        title: "Modern Farmhouse",
        description: "Contemporary farmhouse on 2 acres with stunning countryside views. 5 bedrooms, gourmet kitchen, and wrap-around porch. Perfect blend of modern amenities and rural charm.",
        propertyType: "Farmhouse",
        location: "Nashville, TN",
        price: 4800,
        photo: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop"
    },
    {
        title: "Retail Space Downtown",
        description: "Prime retail location with high foot traffic. 1,200 sq ft with large storefront windows and basement storage. Perfect for boutique shops, cafes, or service businesses.",
        propertyType: "Retail",
        location: "Chicago, IL",
        price: 5500,
        photo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop"
    },
    {
        title: "Luxury Condo with Amenities",
        description: "High-end 2-bedroom condo in a full-service building. Amenities include doorman, fitness center, rooftop pool, and concierge services. Move-in ready with designer finishes.",
        propertyType: "Condo",
        location: "Los Angeles, CA",
        price: 7200,
        photo: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop"
    },
    {
        title: "Industrial Warehouse Space",
        description: "Large warehouse facility perfect for manufacturing, storage, or distribution. 10,000 sq ft with loading docks, high ceilings, and easy highway access.",
        propertyType: "Warehouse",
        location: "Phoenix, AZ",
        price: 8000,
        photo: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop"
    }
];

const seedDatabase = async () => {
    try {
        await connectDB(process.env.MONGODB_URL);
        
        // Clear existing data
        await User.deleteMany({});
        await Property.deleteMany({});
        
        console.log("Existing data cleared.");
        
        // Create users
        const createdUsers = await User.insertMany(users);
        console.log(`${createdUsers.length} users created.`);
        
        // Create properties with random user assignments
        const propertiesWithCreators = properties.map((property) => {
            const randomUserIndex = Math.floor(Math.random() * createdUsers.length);
            return {
                ...property,
                creator: createdUsers[randomUserIndex]._id
            };
        });
        
        const createdProperties = await Property.insertMany(propertiesWithCreators);
        console.log(`${createdProperties.length} properties created.`);
        
        // Update users with their properties
        for (let i = 0; i < createdProperties.length; i++) {
            const property = createdProperties[i];
            await User.findByIdAndUpdate(
                property.creator,
                { $push: { allProperties: property._id } }
            );
        }
        
        console.log("Database seeded successfully!");
        console.log("\nSample data includes:");
        console.log(`- ${createdUsers.length} users with realistic profiles`);
        console.log(`- ${createdProperties.length} properties across various types and locations`);
        console.log("- Property types: Apartment, Villa, House, Office, Cabin, Studio, Penthouse, Townhouse, Farmhouse, Retail, Condo, Warehouse");
        console.log("- Locations across major US cities");
        console.log("- Price range: $1,800 - $15,000");
        
        // eslint-disable-next-line no-process-exit
        process.exit(0);
    } catch (error) {
        console.error("Error seeding database:", error);
        // eslint-disable-next-line no-process-exit
        process.exit(1);
    }
};

seedDatabase();