// package com.vitorpaulinog.youlyrics.backend.service.impl;

// import static org.assertj.core.api.Assertions.assertThatThrownBy;
// import static org.junit.jupiter.api.Assertions.*;
// import static org.mockito.ArgumentMatchers.any;
// import static org.mockito.Mockito.*;

// import com.vitorpaulinog.youlyrics.backend.domain.entity.TextualProduction;
// import com.vitorpaulinog.youlyrics.backend.dto.mapper.TextualProductionMapper;
// import com.vitorpaulinog.youlyrics.backend.dto.request.TextualProductionCreateRequestDto;
// import org.junit.jupiter.api.Test;
// import org.junit.jupiter.api.extension.ExtendWith;
// import org.mapstruct.factory.Mappers;
// import org.mockito.InjectMocks;
// import org.mockito.Mock;
// import org.mockito.Spy;
// import org.mockito.junit.jupiter.MockitoExtension;

// import com.vitorpaulinog.youlyrics.backend.repository.TextualProductionRepository;
// import org.springframework.data.domain.Page;
// import org.springframework.data.domain.PageImpl;
// import org.springframework.data.domain.PageRequest;
// import org.springframework.data.domain.Pageable;

// import java.util.List;

// @ExtendWith(MockitoExtension.class)
// public class TextualProductionServiceImplTest {
//     @Mock
//     private TextualProductionRepository repository;

//     @Spy
//     private TextualProductionMapper mapper = Mappers.getMapper(TextualProductionMapper.class);


//     @InjectMocks
//     private TextualProductionServiceImpl service;

//     @Test
//     void save_should_saveTextualProductionAndReturnDto() {
//         var textualProduction = TextualProductionCreateRequestDto.builder()
//                 .title("Title")
//                 .content("Content")
//                 .literaryGenre("Literary Genre")
//                 .build();

//         var textualProductionMock = TextualProduction.builder()
//                 .title("Title")
//                 .content("Content")
//                 .literaryGenre("Literary Genre")
//                 .build();

//         when(repository.save(any())).thenReturn(textualProductionMock);

//         var result = service.save(textualProduction);

//         verify(repository).save(any());
//         verify(mapper).toCreateDto(any());

//         assertNotNull(result);
//         assertEquals(textualProductionMock.getId(), result.getId());
//     }

//     @Test
//     void findAll_should_returnTextualProductions() {
//         Page<TextualProduction> textualProductionsMock = new PageImpl<TextualProduction>(List.of(
//                 TextualProduction.builder()
//                     .title("Title01")
//                     .content("Content01")
//                     .literaryGenre("Literary Genre")
//                     .build(),
//                 TextualProduction.builder()
//                     .title("Title02")
//                     .content("Content02")
//                     .literaryGenre("Literary Genre")
//                     .build()
//         ));

//         Pageable pageable = PageRequest.of(0, 10);
//         when(repository.findAll(any(Pageable.class))).thenReturn(textualProductionsMock);

//         var result = service.findAll(pageable);
//         verify(repository).findAll(pageable);
//         verify(mapper, times(2)).toGetDto(any());
//         assertNotNull(result);
//         assertEquals(2, result.getTotalElements());
//     }
// }
