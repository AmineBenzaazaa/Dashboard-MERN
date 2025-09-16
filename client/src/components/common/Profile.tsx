import Email from "@mui/icons-material/Email";
import Phone from "@mui/icons-material/Phone";
import Place from "@mui/icons-material/Place";
import Person from "@mui/icons-material/Person";
import Business from "@mui/icons-material/Business";
import CalendarToday from "@mui/icons-material/CalendarToday";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";

import { ProfileProps, PropertyProps } from "interfaces/common";
import PropertyCard from "./PropertyCard";

function checkImage(url: any) {
    const img = new Image();
    img.src = url;
    return img.width !== 0 && img.height !== 0;
}

const Profile = ({ type, name, avatar, email, properties }: ProfileProps) => {
    // Generate some dynamic profile data based on the user
    const getProfileData = () => {
        const cities = ["New York, NY", "Los Angeles, CA", "Chicago, IL", "Houston, TX", "Phoenix, AZ", "Philadelphia, PA"];
        const phones = ["+1 (555) 123-4567", "+1 (555) 234-5678", "+1 (555) 345-6789", "+1 (555) 456-7890"];
        const joinDates = ["January 2020", "March 2019", "June 2021", "September 2018", "December 2020"];
        
        const hash = name?.split('').reduce((a, b) => {
            a = ((a << 5) - a) + b.charCodeAt(0);
            return a & a;
        }, 0) || 0;
        
        return {
            location: cities[Math.abs(hash) % cities.length],
            phone: phones[Math.abs(hash) % phones.length],
            joinDate: joinDates[Math.abs(hash) % joinDates.length],
            totalProperties: properties?.length || 0
        };
    };
    
    const profileData = getProfileData();
    
    return (
        <Box>
            <Typography fontSize={25} fontWeight={700} color="#11142D" mb={3}>
                {type} Profile
            </Typography>

            {/* Profile Header Card */}
            <Card sx={{ borderRadius: "15px", mb: 3, boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)" }}>
                <CardContent sx={{ p: 4 }}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: { xs: "column", md: "row" },
                            gap: 4,
                            alignItems: { xs: "center", md: "flex-start" }
                        }}
                    >
                        <Avatar
                            src={
                                checkImage(avatar)
                                    ? avatar
                                    : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                            }
                            sx={{ width: 120, height: 120, mb: { xs: 2, md: 0 } }}
                        />
                        
                        <Box flex={1}>
                            <Box mb={3}>
                                <Typography
                                    fontSize={28}
                                    fontWeight={700}
                                    color="#11142D"
                                    mb={1}
                                >
                                    {name}
                                </Typography>
                                <Box display="flex" gap={1} mb={2}>
                                    <Chip 
                                        icon={<Business />} 
                                        label="Real Estate Agent" 
                                        variant="outlined" 
                                        size="small"
                                        sx={{ color: "#475BE8", borderColor: "#475BE8" }}
                                    />
                                    <Chip 
                                        icon={<Person />} 
                                        label="Verified" 
                                        color="success" 
                                        size="small"
                                    />
                                </Box>
                            </Box>
                            
                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
                                    gap: 3
                                }}
                            >
                                <Box>
                                    <Typography
                                        fontSize={12}
                                        fontWeight={500}
                                        color="#808191"
                                        textTransform="uppercase"
                                        mb={1}
                                    >
                                        Email Address
                                    </Typography>
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <Email sx={{ color: "#475BE8", fontSize: 18 }} />
                                        <Typography fontSize={14} color="#11142D">
                                            {email}
                                        </Typography>
                                    </Box>
                                </Box>
                                
                                <Box>
                                    <Typography
                                        fontSize={12}
                                        fontWeight={500}
                                        color="#808191"
                                        textTransform="uppercase"
                                        mb={1}
                                    >
                                        Phone Number
                                    </Typography>
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <Phone sx={{ color: "#475BE8", fontSize: 18 }} />
                                        <Typography fontSize={14} color="#11142D">
                                            {profileData.phone}
                                        </Typography>
                                    </Box>
                                </Box>
                                
                                <Box>
                                    <Typography
                                        fontSize={12}
                                        fontWeight={500}
                                        color="#808191"
                                        textTransform="uppercase"
                                        mb={1}
                                    >
                                        Location
                                    </Typography>
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <Place sx={{ color: "#475BE8", fontSize: 18 }} />
                                        <Typography fontSize={14} color="#11142D">
                                            {profileData.location}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
            
            {/* Stats Card */}
            <Card sx={{ borderRadius: "15px", mb: 3, boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)" }}>
                <CardContent sx={{ p: 4 }}>
                    <Typography fontSize={18} fontWeight={600} color="#11142D" mb={3}>
                        Profile Statistics
                    </Typography>
                    
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: { xs: "1fr 1fr", md: "1fr 1fr 1fr 1fr" },
                            gap: 3
                        }}
                    >
                        <Box textAlign="center">
                            <Typography fontSize={24} fontWeight={700} color="#475BE8">
                                {profileData.totalProperties}
                            </Typography>
                            <Typography fontSize={14} color="#808191">
                                Total Properties
                            </Typography>
                        </Box>
                        
                        <Box textAlign="center">
                            <Typography fontSize={24} fontWeight={700} color="#475BE8">
                                {Math.floor(profileData.totalProperties * 0.8)}
                            </Typography>
                            <Typography fontSize={14} color="#808191">
                                Active Listings
                            </Typography>
                        </Box>
                        
                        <Box textAlign="center">
                            <Typography fontSize={24} fontWeight={700} color="#475BE8">
                                {Math.floor(profileData.totalProperties * 0.6)}
                            </Typography>
                            <Typography fontSize={14} color="#808191">
                                Sold Properties
                            </Typography>
                        </Box>
                        
                        <Box textAlign="center">
                            <Box display="flex" alignItems="center" justifyContent="center" gap={1} mb={1}>
                                <CalendarToday sx={{ color: "#475BE8", fontSize: 18 }} />
                                <Typography fontSize={14} fontWeight={600} color="#475BE8">
                                    {profileData.joinDate}
                                </Typography>
                            </Box>
                            <Typography fontSize={14} color="#808191">
                                Member Since
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>
            </Card>

            {properties.length > 0 && (
                <Card sx={{ borderRadius: "15px", boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)" }}>
                    <CardContent sx={{ p: 4 }}>
                        <Typography fontSize={18} fontWeight={600} color="#11142D" mb={3}>
                            {type} Properties
                        </Typography>

                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: {
                                    xs: "1fr",
                                    sm: "repeat(2, 1fr)",
                                    md: "repeat(3, 1fr)",
                                    lg: "repeat(4, 1fr)"
                                },
                                gap: 2.5,
                            }}
                        >
                            {properties?.map((property: PropertyProps) => (
                                <PropertyCard
                                    key={property._id}
                                    id={property._id}
                                    title={property.title}
                                    location={property.location}
                                    price={property.price}
                                    photo={property.photo}
                                />
                            ))}
                        </Box>
                    </CardContent>
                </Card>
            )}
        </Box>
    );
};

export default Profile;
