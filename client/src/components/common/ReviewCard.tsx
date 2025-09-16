import Star from "@mui/icons-material/Star";
import StarBorder from "@mui/icons-material/StarBorder";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";

export interface ReviewCardProps {
    id?: string;
    reviewerName: string;
    reviewerAvatar: string;
    propertyTitle: string;
    rating: number;
    comment: string;
    date: string;
}

const ReviewCard = ({
    reviewerName,
    reviewerAvatar,
    propertyTitle,
    rating,
    comment,
    date,
}: ReviewCardProps) => {
    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                i <= rating ? (
                    <Star key={i} sx={{ color: "#F2C94C", fontSize: 18 }} />
                ) : (
                    <StarBorder key={i} sx={{ color: "#F2C94C", fontSize: 18 }} />
                )
            );
        }
        return stars;
    };

    return (
        <Card
            sx={{
                maxWidth: "400px",
                padding: "15px",
                "&:hover": {
                    boxShadow: "0 22px 45px 2px rgba(176, 176, 176, 0.1)",
                },
                cursor: "pointer",
                minHeight: "200px",
            }}
            elevation={0}
        >
            <CardContent sx={{ padding: 0 }}>
                <Stack direction="column" gap={2}>
                    {/* Header with avatar and reviewer info */}
                    <Stack direction="row" gap={2} alignItems="center">
                        <Avatar
                            src={reviewerAvatar}
                            alt={reviewerName}
                            sx={{ width: 50, height: 50 }}
                        />
                        <Stack direction="column" flex={1}>
                            <Typography fontSize={16} fontWeight={600} color="#11142d">
                                {reviewerName}
                            </Typography>
                            <Typography fontSize={12} color="#808191">
                                {new Date(date).toLocaleDateString()}
                            </Typography>
                        </Stack>
                        <Stack direction="row" gap={0.5}>
                            {renderStars(rating)}
                        </Stack>
                    </Stack>

                    {/* Property title */}
                    <Box
                        px={1.5}
                        py={0.5}
                        borderRadius={1}
                        bgcolor="#f0f0f0"
                        width="fit-content"
                    >
                        <Typography fontSize={12} fontWeight={500} color="#475be8">
                            {propertyTitle}
                        </Typography>
                    </Box>

                    {/* Review comment */}
                    <Typography
                        fontSize={14}
                        color="#11142d"
                        sx={{
                            display: "-webkit-box",
                            WebkitLineClamp: 4,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            lineHeight: 1.5,
                        }}
                    >
                        "{comment}"
                    </Typography>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default ReviewCard;