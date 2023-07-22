import React from 'react';

const jsonData = [
    {
        author: 'John Doe',
        title: 'Post Title 1',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vitae massa id sem euismod iaculis. Sed eget elit felis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Etiam ut elit fermentum, euismod erat eu, volutpat odio.',
        date: '2023-07-20',
        tag: 'Technology',
        imageUrl: 'URL_TO_IMAGE_1',
    },
    {
        author: 'Jane Smith',
        title: 'Post Title 2',
        description:
            'Quisque ut arcu id mi pharetra finibus at sit amet massa. Suspendisse potenti. Nulla facilisi. Nulla non sem eu arcu placerat rhoncus eu eu odio. Integer convallis justo ac libero malesuada, at bibendum ligula gravida.',
        date: '2023-07-19',
        tag: 'Science',
        imageUrl: 'URL_TO_IMAGE_2',
    },
    {
        author: 'Alice Johnson',
        title: 'Post Title 3',
        description:
            'Pellentesque eu mi vitae arcu egestas interdum vel in metus. Fusce in quam vel quam dictum euismod nec ac justo. Praesent at ante sit amet libero scelerisque euismod at in risus.',
        date: '2023-07-18',
        tag: 'Nature',
        imageUrl: 'URL_TO_IMAGE_3',
    },
    {
        author: 'Bob Anderson',
        title: 'Post Title 4',
        description:
            'Vivamus consectetur nisl et ante suscipit, a blandit purus tristique. Sed id mi ut ex hendrerit pharetra. Proin vehicula tortor nec neque vehicula rhoncus. Fusce facilisis in urna vel consectetur.',
        date: '2023-07-17',
        tag: 'Travel',
        imageUrl: 'URL_TO_IMAGE_4',
    },
    {
        author: 'Emma Wilson',
        title: 'Post Title 5',
        description:
            'Maecenas vel est ac nisi tristique aliquet eu sit amet lectus. Ut a erat et enim volutpat consectetur. Duis tincidunt ipsum non bibendum blandit. Curabitur gravida urna non libero bibendum, vel dapibus nunc tempus.',
        date: '2023-07-16',
        tag: 'Food',
        imageUrl: 'URL_TO_IMAGE_5',
    },
    {
        author: 'Michael Brown',
        title: 'Post Title 6',
        description:
            'Suspendisse ultricies ipsum nec est volutpat, eget pellentesque odio fringilla. Aenean ultricies gravida ligula, non euismod nisi consequat non. Nulla tincidunt justo non leo consectetur sollicitudin. Nulla ut tellus vel ex consequat.',
        date: '2023-07-15',
        tag: 'Health',
        imageUrl: 'URL_TO_IMAGE_6',
    },
    {
        author: 'Olivia Taylor',
        title: 'Post Title 7',
        description:
            'Phasellus eu tristique turpis. Sed eu nulla in purus feugiat hendrerit eu ac nunc. Sed eget metus ut justo posuere sollicitudin. Proin vitae mi bibendum, suscipit nisi quis, hendrerit lectus.',
        date: '2023-07-14',
        tag: 'Fashion',
        imageUrl: 'URL_TO_IMAGE_7',
    },
    {
        author: 'William Lee',
        title: 'Post Title 8',
        description:
            'Vestibulum consectetur purus a massa fermentum, in vehicula libero sagittis. Nulla facilisi. Fusce eget sapien nec erat vestibulum iaculis. Fusce ullamcorper erat a velit egestas, eu placerat ipsum vulputate.',
        date: '2023-07-13',
        tag: 'Art',
        imageUrl: 'URL_TO_IMAGE_8',
    },
    {
        author: 'Sophia Thomas',
        title: 'Post Title 9',
        description:
            'Ut scelerisque eros eget odio fermentum mollis. Ut vel orci consequat, fermentum ligula id, hendrerit nunc. Fusce eget nunc facilisis, iaculis mauris id, interdum nulla. Aenean nec justo eu nibh dictum iaculis.',
        date: '2023-07-12',
        tag: 'Culture',
        imageUrl: 'URL_TO_IMAGE_9',
    },
    {
        author: 'James Harris',
        title: 'Post Title 10',
        description:
            'Sed in lacus vel ex ultrices efficitur a eget turpis. Sed venenatis eros vel risus laoreet, eget posuere neque viverra. Nulla venenatis orci nec pharetra tincidunt. Sed sit amet metus non quam malesuada gravida.',
        date: '2023-07-11',
        tag: 'History',
        imageUrl: 'URL_TO_IMAGE_10',
    },
    // Add more posts as needed...
];

const Post = ({ post }) => {
    return (
        <div className="flex w-full items-center mb-12">
            
            <div className='w-2/3'>
                <div className='flex items-center mb-2'>
                    <div className='bg-logo w-5 h-5 rounded-full mr-2 bg-cover'></div>
                    <div className='text-gray-600 text-sm'>{post.author}</div>
                </div>
                <div className="font-bold">{post.title}</div>
                <div className="text-gray-600 description">{post.description}</div>
                <div className="text-gray-600">{post.date}</div>
                <div className="text-gray-600">{post.tag}</div>
            </div>
            <div className="w-32 h-32 mx-8">
                <div className='bg-logo w-full h-full object-cover bg-contain bg-no-repeat'></div>
                {/* <img src={post.imageUrl} alt={"post"} className="w-full h-full object-cover rounded" /> */}
            </div>
        </div>
    );
};

const AllPosts = () => {
    return (
        <div>
            {/* Custom JSON data for blog posts */}
            {jsonData.map((post, index) => (
                <Post key={index} post={post} />
            ))}
        </div>
    );
};

export default AllPosts;
