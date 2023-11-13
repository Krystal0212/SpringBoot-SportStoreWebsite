package com.ESDC.FinalTerm.controllers.User;


import com.ESDC.FinalTerm.controllers.Product.Product;
import com.ESDC.FinalTerm.controllers.Product.ProductService;
import com.ESDC.FinalTerm.objects.User;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;


import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

@Controller
@ControllerAdvice
@RequestMapping("/user")
public class UserController {
    private List<String> brands;

    @Autowired

    private ObjectMapper objectMapper;

    @Autowired
    private UserService userService;

    @Autowired
    private ProductService productService;
    private List<String> brands;

    @GetMapping("/login")
    public String showLoginForm(Model model) {
        model.addAttribute("user", new User());
        return "login";
    }

    @PostMapping("/home")
    public String loginUser(@ModelAttribute User user, Model model) {
        try {
            User loggedInUser = userService.loginCustomerByTyping(user.getUsername(), user.getPassword());

            if (loggedInUser != null) {
                //đưa user đó vào localStorage
                String myUser = objectMapper.writeValueAsString(loggedInUser);

                model.addAttribute("myUser", myUser);
                model.addAttribute("user", loggedInUser);
                return "index";
            } else {
                model.addAttribute("error", "Invalid username or password");
                return "login";
            }
        } catch (ExecutionException | InterruptedException e) {
            model.addAttribute("error", "Error during login");
            return "login";
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/logout")
    public String logoutUser() {
        userService.logoutUser();
        return "redirect:/home";
    }

    @GetMapping("/dashboard")
    public String showDashboard(Model model) {
        // Retrieve user information from the service
        User user = userService.getCurrentUser();
        model.addAttribute("user", user);
        return "dashboard";
    }

    @GetMapping("/home")
    public String showHome(Model model) {
        String userID = userService.getCurrentUser().getUserID();
        return "index";
    }

    @PostMapping("/google-login")
    public ResponseEntity<String> loginGoogleUser(@RequestParam("userName") String userName, @RequestParam("email") String email, @RequestParam("isGoogleUser") boolean isGoogleUser, Model model) {
        try {
            User user = new User();
            user.setUsername(userName);
            user.setEmail(email);
            user.setGoogleUser(isGoogleUser);

            User loggedInUser = userService.findAndSaveGoogleUser(user);
            //đưa user đó vào localStorage
            ObjectMapper objectMapper = new ObjectMapper();
            String jsonString = objectMapper.writeValueAsString(loggedInUser);


            if (loggedInUser != null) {
                model.addAttribute("user", user);

                // Return a success response
                return ResponseEntity.ok("Google login successful");
            } else {
                model.addAttribute("error", "Google login failed");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Invalid account");
            }
        } catch (ExecutionException | InterruptedException e) {
            model.addAttribute("error", "Error during Google login");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error during Google login");
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/shoes")
    public String shoes(Model model){
        // Lấy danh sách sản phẩm Shoes
        List<Product> products = productService.getProductsByType("Shoes");
        brands = productService.getCurrentBrands(products);
        model.addAttribute("brands", brands);
        model.addAttribute("products", products);
        return "product-shoes";
    }

    @PostMapping("/shoes/filter")
    public String shoesFilter(@RequestParam(required = false) String productName,
                              @RequestParam(required = false) Double minPrice,
                              @RequestParam(required = false) Double maxPrice,
                              @RequestParam(required = false) String sortByPrice,
                              @RequestParam(required = false) List<String> brandList,
                              Model model) {
        List<Product> products = productService.getProductByTypeAndFilter("Shoes",productName, minPrice, maxPrice, sortByPrice, brandList);
        model.addAttribute("products", products);
        model.addAttribute("brands", brands);
        return "product-shoes"; // Giả sử có một view có tên là "productList" để hiển thị danh sách sản phẩm
    }

    @GetMapping("/clothes")
    public String clothes(Model model){
        // Lấy danh sách sản phẩm Shoes
        List<Product> products = productService.getProductsByType("Clothes");
        brands = productService.getCurrentBrands(products);
        model.addAttribute("brands", brands);
        model.addAttribute("products", products);
        return "product-clothes";
    }

    @PostMapping("/clothes/filter")
    public String clothesFilter(@RequestParam(required = false) String productName,
                                @RequestParam(required = false) Double minPrice,
                                @RequestParam(required = false) Double maxPrice,
                                @RequestParam(required = false) String sortByPrice,
                                @RequestParam(required = false) List<String> brandList,
                                Model model) {
        List<Product> products = productService.getProductByTypeAndFilter("Clothes",productName, minPrice, maxPrice, sortByPrice, brandList);
        model.addAttribute("products", products);
        model.addAttribute("brands", brands);
        return "product-clothes"; // Giả sử có một view có tên là "productList" để hiển thị danh sách sản phẩm
    }

    @GetMapping("/accessories")
    public String accessories(Model model){
        // Lấy danh sách sản phẩm Shoes
        List<Product> products = productService.getProductsByType("Accessory");
        brands = productService.getCurrentBrands(products);
        model.addAttribute("brands", brands);
        model.addAttribute("products", products);
        return "product-accessories";
    }

    @PostMapping("/accessories/filter")
    public String accessoriesFilter(@RequestParam(required = false) String productName,
                                    @RequestParam(required = false) Double minPrice,
                                    @RequestParam(required = false) Double maxPrice,
                                    @RequestParam(required = false) String sortByPrice,
                                    @RequestParam(required = false) List<String> brandList,
                                    Model model) {
        List<Product> products = productService.getProductByTypeAndFilter("Accessory",productName, minPrice, maxPrice, sortByPrice, brandList);
        model.addAttribute("products", products);
        model.addAttribute("brands", brands);
        return "product-accessories"; // Giả sử có một view có tên là "productList" để hiển thị danh sách sản phẩm
    }

    @PostMapping("/saveUserId")
    public ResponseEntity<Map<String, String>> saveUserId(@RequestBody Map<String, String> request) {
        String userId = request.get("userId");
        //lay ID cua user hien tai
        userService.getCurrentUser().setUserID(userId);

        return ResponseEntity.ok(Collections.emptyMap());
    }

    @GetMapping("/cart")
    public String Cart(Model model) {
        String userID = userService.getCurrentUser().getUserID();
        if(userID == null){
            return "waitingLobby";
        }
        else{
            // Gọi hàm từ CartService để lấy thông tin giỏ hàng
            CompletableFuture<List<ProductInCart>> customerCartFuture = productService.getCustomerCart(userID);

            try {
                // Chờ cho CompletableFuture hoàn thành
                List<ProductInCart> customerCart = customerCartFuture.get();

                // Thêm icon xóa cho mỗi sản phẩm
                for (ProductInCart item : customerCart) {
                    item.setDeleteIcon("&#10005;");
                    String icon = item.getDeleteIcon();
                    System.out.println(icon);
                }

                double totalAmount = customerCart.stream()
                        .mapToDouble(product -> Double.parseDouble(product.getPrice()))
                        .sum();
                // Chuyển danh sách sản phẩm vào model để hiển thị trên trang HTML
                model.addAttribute("totalAmount", totalAmount);
                model.addAttribute("customerCart", customerCart);
            } catch (InterruptedException | ExecutionException e) {
                e.printStackTrace();
            }
            return "cart";
        }
    }

    @DeleteMapping("/deleteItem")
    public CompletableFuture<ResponseEntity<String>> deleteItem(@RequestBody Product item) {
        return productService.deleteItem(userService.getCurrentUser().getUserID(), item.getName())
                .thenApply(result -> ResponseEntity.ok("Item deleted successfully"))
                .exceptionally(ex -> ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting item: " + ex.getMessage()));
    }
}
