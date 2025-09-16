import { useState, useMemo } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Rating from "@mui/material/Rating";

import { ReviewCard, CustomButton } from "components";

// Mock data for reviews
const mockReviews = [
    {
        _id: "1",
        reviewerName: "Sarah Johnson",
        reviewerAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        propertyTitle: "Modern Downtown Apartment",
        rating: 5,
        comment: "Absolutely loved this place! The location is perfect, right in the heart of downtown with easy access to restaurants and shops. The apartment is beautifully designed with modern amenities. The host was very responsive and helpful throughout our stay.",
        date: "2024-01-15",
        propertyType: "apartment"
    },
    {
        _id: "2",
        reviewerName: "Michael Chen",
        reviewerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        propertyTitle: "Luxury Villa with Pool",
        rating: 4,
        comment: "Great villa for a family vacation. The pool area was fantastic and the kids loved it. The house is spacious and well-maintained. Only minor issue was the WiFi connection in some rooms, but overall a wonderful experience.",
        date: "2024-01-12",
        propertyType: "villa"
    },
    {
        _id: "3",
        reviewerName: "Emily Rodriguez",
        reviewerAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        propertyTitle: "Cozy Studio Near Beach",
        rating: 5,
        comment: "Perfect little getaway! The studio is small but has everything you need. Being so close to the beach was amazing - we could hear the waves at night. Clean, comfortable, and great value for money.",
        date: "2024-01-10",
        propertyType: "studio"
    },
    {
        _id: "4",
        reviewerName: "David Thompson",
        reviewerAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        propertyTitle: "Mountain Chalet Retreat",
        rating: 5,
        comment: "Incredible mountain views and such a peaceful location. The chalet is beautifully decorated and has all the amenities you could want. Perfect for a romantic getaway or quiet retreat from city life.",
        date: "2024-01-08",
        propertyType: "chalet"
    },
    {
        _id: "5",
        reviewerName: "Lisa Wang",
        reviewerAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
        propertyTitle: "Family Townhouse",
        rating: 4,
        comment: "Great space for our family of five. The townhouse has plenty of room and the kitchen is well-equipped for cooking meals. The neighborhood is quiet and safe. Would definitely stay here again.",
        date: "2024-01-05",
        propertyType: "townhouse"
    },
    {
        _id: "6",
        reviewerName: "James Wilson",
        reviewerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        propertyTitle: "Urban Condo with City Views",
        rating: 3,
        comment: "The condo has amazing city views and is in a great location. However, there were some maintenance issues during our stay and the building can be quite noisy. The host was responsive to our concerns.",
        date: "2024-01-03",
        propertyType: "condos"
    },
    {
        _id: "7",
        reviewerName: "Maria Garcia",
        reviewerAvatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
        propertyTitle: "Rustic Farmhouse Experience",
        rating: 5,
        comment: "What a unique and wonderful experience! The farmhouse is charming and authentic, surrounded by beautiful countryside. We loved the fresh eggs from the chickens and the vegetable garden. A true escape from modern life.",
        date: "2024-01-01",
        propertyType: "farmhouse"
    },
    {
        _id: "8",
        reviewerName: "Robert Kim",
        reviewerAvatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face",
        propertyTitle: "Spacious Duplex Home",
        rating: 4,
        comment: "Excellent property for a group stay. The duplex provided plenty of space for everyone to have privacy while still being together. Well-maintained and in a good neighborhood with easy parking.",
        date: "2023-12-28",
        propertyType: "duplex"
    }
];

const Reviews = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
    const [filters, setFilters] = useState({
        reviewer: "",
        propertyType: "",
        rating: 0
    });

    const filteredAndSortedReviews = useMemo(() => {
        let filtered = mockReviews.filter(review => {
            const matchesReviewer = !filters.reviewer || 
                review.reviewerName.toLowerCase().includes(filters.reviewer.toLowerCase());
            const matchesPropertyType = !filters.propertyType || 
                review.propertyType === filters.propertyType;
            const matchesRating = filters.rating === 0 || review.rating >= filters.rating;
            
            return matchesReviewer && matchesPropertyType && matchesRating;
        });

        // Sort by date
        filtered.sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
        });

        return filtered;
    }, [filters, sortOrder]);

    const paginatedReviews = useMemo(() => {
        const startIndex = (currentPage - 1) * pageSize;
        return filteredAndSortedReviews.slice(startIndex, startIndex + pageSize);
    }, [filteredAndSortedReviews, currentPage, pageSize]);

    const pageCount = Math.ceil(filteredAndSortedReviews.length / pageSize);

    const toggleSort = () => {
        setSortOrder(prev => prev === "asc" ? "desc" : "asc");
    };

    return (
        <Box>
            <Box mt="20px" sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                <Stack direction="column" width="100%">
                    <Typography fontSize={25} fontWeight={700} color="#11142d">
                        {!filteredAndSortedReviews.length
                            ? "No reviews found"
                            : "All Reviews"}
                    </Typography>
                    <Box
                        mb={2}
                        mt={3}
                        display="flex"
                        width="84%"
                        justifyContent="space-between"
                        flexWrap="wrap"
                    >
                        <Box
                            display="flex"
                            gap={2}
                            flexWrap="wrap"
                            mb={{ xs: "20px", sm: 0 }}
                        >
                            <CustomButton
                                title={`Sort by date ${sortOrder === "asc" ? "↑" : "↓"}`}
                                handleClick={toggleSort}
                                backgroundColor="#475be8"
                                color="#fcfcfc"
                            />
                            <TextField
                                variant="outlined"
                                color="info"
                                placeholder="Search by reviewer name"
                                value={filters.reviewer}
                                onChange={(e) => {
                                    setFilters(prev => ({
                                        ...prev,
                                        reviewer: e.target.value
                                    }));
                                    setCurrentPage(1);
                                }}
                            />
                            <Select
                                variant="outlined"
                                color="info"
                                displayEmpty
                                value={filters.propertyType}
                                onChange={(e) => {
                                    setFilters(prev => ({
                                        ...prev,
                                        propertyType: e.target.value
                                    }));
                                    setCurrentPage(1);
                                }}
                            >
                                <MenuItem value="">All Property Types</MenuItem>
                                {[
                                    "Apartment",
                                    "Villa",
                                    "Farmhouse",
                                    "Condos",
                                    "Townhouse",
                                    "Duplex",
                                    "Studio",
                                    "Chalet",
                                ].map((type) => (
                                    <MenuItem
                                        key={type}
                                        value={type.toLowerCase()}
                                    >
                                        {type}
                                    </MenuItem>
                                ))}
                            </Select>
                            <Box display="flex" alignItems="center" gap={1}>
                                <Typography fontSize={14} color="#808191">
                                    Min Rating:
                                </Typography>
                                <Rating
                                    value={filters.rating}
                                    onChange={(_, newValue) => {
                                        setFilters(prev => ({
                                            ...prev,
                                            rating: newValue || 0
                                        }));
                                        setCurrentPage(1);
                                    }}
                                    size="small"
                                />
                            </Box>
                        </Box>
                    </Box>
                </Stack>
            </Box>

            <Box mt="20px" sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                {paginatedReviews.map((review) => (
                    <ReviewCard
                        key={review._id}
                        id={review._id}
                        reviewerName={review.reviewerName}
                        reviewerAvatar={review.reviewerAvatar}
                        propertyTitle={review.propertyTitle}
                        rating={review.rating}
                        comment={review.comment}
                        date={review.date}
                    />
                ))}
            </Box>

            {filteredAndSortedReviews.length > 0 && (
                <Box display="flex" gap={2} mt={3} flexWrap="wrap">
                    <CustomButton
                        title="Previous"
                        handleClick={() => setCurrentPage((prev) => prev - 1)}
                        backgroundColor="#475be8"
                        color="#fcfcfc"
                        disabled={currentPage <= 1}
                    />
                    <Box
                        display={{ xs: "hidden", sm: "flex" }}
                        alignItems="center"
                        gap="5px"
                    >
                        Page{" "}
                        <strong>
                            {currentPage} of {pageCount}
                        </strong>
                    </Box>
                    <CustomButton
                        title="Next"
                        handleClick={() => setCurrentPage((prev) => prev + 1)}
                        backgroundColor="#475be8"
                        color="#fcfcfc"
                        disabled={currentPage >= pageCount}
                    />
                    <Select
                        variant="outlined"
                        color="info"
                        displayEmpty
                        value={pageSize}
                        onChange={(e) => {
                            setPageSize(Number(e.target.value));
                            setCurrentPage(1);
                        }}
                    >
                        {[5, 10, 20, 30].map((size) => (
                            <MenuItem key={size} value={size}>
                                Show {size}
                            </MenuItem>
                        ))}
                    </Select>
                </Box>
            )}
        </Box>
    );
};

export default Reviews;